import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SchedulerRegistry } from '@nestjs/schedule';
import { ConfigService } from '@nestjs/config';
import { CronJob } from 'cron';
import { LessThan, Repository } from 'typeorm';
import { Deadline } from '../../db/entities/deadline.entity';
import { Task, TaskStatus } from '../../db/entities/task.entity';
import { CreateDeadlineDto } from './dto/create-deadline.dto';

@Injectable()
export class DeadlinesService {
  constructor(
    private readonly configService: ConfigService,
    private readonly schedulerRegistry: SchedulerRegistry,
    @InjectRepository(Deadline)
    private readonly deadlinesRepository: Repository<Deadline>,
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,
  ) {}

  onModuleInit() {
    const cronExpression = this.configService.getOrThrow<string>(
      'DEADLINE_CRON_JOB_EXPRESSION',
    );

    const job = new CronJob(cronExpression, () => {
      this.deadlineReachedStatusUpdater();
    });

    this.schedulerRegistry.addCronJob('dynamicCronJob', job);

    job.start();
  }

  async create(
    userId: number,
    createDeadlineDto: CreateDeadlineDto,
  ): Promise<Deadline> {
    const { taskId, deadline } = createDeadlineDto;

    const task = await this.tasksRepository.findOne({
      where: { id: taskId, project: { user: { id: userId } } },
      relations: ['project', 'project.user'],
    });

    if (!task) {
      throw new BadRequestException('Task not found');
    }

    if (task.status !== TaskStatus.CREATED) {
      throw new BadRequestException(
        'Deadline can only be set for tasks with status CREATED',
      );
    }

    const newDeadline = this.deadlinesRepository.create({
      task,
      deadline,
    });

    return this.deadlinesRepository.save(newDeadline);
  }

  private async deadlineReachedStatusUpdater() {
    const currentDateTime = new Date();

    const deadlines = await this.deadlinesRepository.find({
      where: {
        deadline: LessThan(currentDateTime),
      },
      relations: ['task'],
    });

    if (!deadlines.length) {
      console.log('No overdue tasks found.');
      return;
    }

    for (const deadline of deadlines) {
      const task = deadline.task;

      if (task.status === TaskStatus.CREATED) {
        task.status = TaskStatus.OVERDUE;
        await this.tasksRepository.save(task);
        console.log(`Task ${task.id} updated to OVERDUE.`);
      }
    }
  }
}

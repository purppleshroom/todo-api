import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../../db/entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) {}

  async create(userId: number, data: CreateTaskDto) {
    const newTask = this.taskRepository.create({
      project: { id: data.projectId },
      title: data.title,
      description: data.description,
    });

    return this.taskRepository.save(newTask);
  }
}

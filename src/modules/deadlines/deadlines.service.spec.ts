import { DeadlinesService } from './deadlines.service';
import { ConfigService } from '@nestjs/config';
import { SchedulerRegistry } from '@nestjs/schedule';
import { Repository } from 'typeorm';
import { Deadline } from 'src/db/entities/deadline.entity';
import { Task } from 'src/db/entities/task.entity';
import { TestBed } from '@automock/jest';

describe('DeadlinesService', () => {
  let service: DeadlinesService;
  let configService: jest.Mocked<ConfigService>;
  let schedulerRegistry: jest.Mocked<SchedulerRegistry>;
  let deadlinesRepository: jest.Mocked<Repository<Deadline>>;
  let tasksRepository: jest.Mocked<Repository<Task>>;

  beforeEach(async () => {
    const { unit, unitRef } = await TestBed.create(DeadlinesService).compile();

    service = unit;
    configService = unitRef.get<ConfigService>(ConfigService);
    schedulerRegistry = unitRef.get<SchedulerRegistry>(SchedulerRegistry);
    deadlinesRepository =
      unitRef.get<Repository<Deadline>>('DeadlineRepository');
    tasksRepository = unitRef.get<Repository<Task>>('TaskRepository');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(configService).toBeDefined();
    expect(schedulerRegistry).toBeDefined();
    expect(deadlinesRepository).toBeDefined();
    expect(tasksRepository).toBeDefined();
  });
});

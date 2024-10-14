import { TestBed } from '@automock/jest';
import { TasksService } from './tasks.service';
import { Repository } from 'typeorm';
import { Task } from '../../db/entities/task.entity';

describe('TasksService', () => {
  let service: TasksService;
  let tasksRepository: jest.Mocked<Repository<Task>>;

  beforeEach(async () => {
    const { unit, unitRef } = await TestBed.create(TasksService).compile();

    service = unit;
    tasksRepository = unitRef.get<Repository<Task>>('TaskRepository');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(tasksRepository).toBeDefined();
  });
});

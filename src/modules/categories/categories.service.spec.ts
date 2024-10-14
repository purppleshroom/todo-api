import { TestBed } from '@automock/jest';
import { CategoriesService } from './categories.service';
import { Repository } from 'typeorm';
import { Project } from '../../db/entities/project.entity';
import { Task } from '../../db/entities/task.entity';
import { Category } from '../../db/entities/category.entity';

describe('CategoriesService', () => {
  let service: CategoriesService;
  let projectRepository: jest.Mocked<Repository<Project>>;
  let taskRepository: jest.Mocked<Repository<Task>>;
  let categoryRepository: jest.Mocked<Repository<Category>>;

  beforeEach(async () => {
    const { unit, unitRef } = await TestBed.create(CategoriesService).compile();

    service = unit;
    projectRepository = unitRef.get<Repository<Project>>('ProjectRepository');
    taskRepository = unitRef.get<Repository<Task>>('TaskRepository');
    categoryRepository =
      unitRef.get<Repository<Category>>('CategoryRepository');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(projectRepository).toBeDefined();
    expect(taskRepository).toBeDefined();
    expect(categoryRepository).toBeDefined();
  });
});

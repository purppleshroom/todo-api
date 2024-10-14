import { TestBed } from '@automock/jest';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

describe('TasksController', () => {
  let controller: TasksController;
  let service: jest.Mocked<TasksService>;

  beforeEach(async () => {
    const { unit, unitRef } = await TestBed.create(TasksController).compile();

    controller = unit;
    service = unitRef.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call task service on create when right dto provided', () => {
    const mockDto = {
      projectId: 1,
      title: 'title',
      description: 'description',
    };

    controller.create(mockDto, { user: { sub: 1, exp: 123 } });

    expect(service.create).toHaveBeenCalledWith(1, mockDto);
  });
});

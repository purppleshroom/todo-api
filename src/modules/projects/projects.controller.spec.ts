import { TestBed } from '@automock/jest';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';

describe('ProjectsController', () => {
  let controller: ProjectsController;
  let service: jest.Mocked<ProjectsService>;

  beforeEach(async () => {
    const { unit, unitRef } =
      await TestBed.create(ProjectsController).compile();

    controller = unit;
    service = unitRef.get<ProjectsService>(ProjectsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call project service on create when right dto provided', () => {
    const mockDto = { name: 'project', description: 'description' };

    controller.create(mockDto, { user: { userId: 1 } });

    expect(service.create).toHaveBeenCalledWith(1, mockDto);
  });
});

import { TestBed } from '@automock/jest';
import { Repository } from 'typeorm';
import { ProjectsService } from './projects.service';
import { Project } from '../../db/entities/project.entity';

describe('ProjectsService', () => {
  let service: ProjectsService;
  let projectRepository: jest.Mocked<Repository<Project>>;

  beforeEach(async () => {
    const { unit, unitRef } = await TestBed.create(ProjectsService).compile();

    service = unit;
    projectRepository = unitRef.get<Repository<Project>>('ProjectRepository');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create project', async () => {
    const projectMock = {
      user: { id: 2 },
      name: 'project',
      description: 'description',
    };

    const projectMockEntity: Project = {
      id: 1,
      user: {
        id: 2,
        email: '',
        password: '',
        emailConfirmed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      name: 'project',
      description: 'description',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    projectRepository.create.mockReturnValue(projectMockEntity);

    await service.create(2, projectMock);

    expect(projectRepository.create).toHaveBeenCalledWith(projectMock);
    expect(projectRepository.save).toHaveBeenCalledWith(projectMockEntity);
  });
});

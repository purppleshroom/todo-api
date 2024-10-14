import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from '../../db/entities/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project) private projectRepository: Repository<Project>,
  ) {}

  async create(userId: number, data: CreateProjectDto) {
    const newProject = this.projectRepository.create({
      user: { id: userId },
      name: data.name,
      description: data.description,
    });

    return this.projectRepository.save(newProject);
  }
}

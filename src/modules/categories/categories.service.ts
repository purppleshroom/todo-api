import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { AssignCategoryDto } from './dto/assaign-category.dto';
import { Category } from '../../db/entities/category.entity';
import { Task } from '../../db/entities/task.entity';
import { Project } from '../../db/entities/project.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) {}

  async create(userId: number, createCategoryDto: CreateCategoryDto) {
    const project = await this.projectRepository.findOne({
      where: {
        id: createCategoryDto.projectId,
        user: { id: userId },
      },
    });

    if (!project) {
      throw new NotFoundException('Project not found or not owned by the user');
    }

    const category = this.categoryRepository.create({
      project: project,
      name: createCategoryDto.name,
    });

    return await this.categoryRepository.save(category);
  }

  async assign(userId: number, assignCategoryDto: AssignCategoryDto) {
    const task = await this.taskRepository.findOne({
      where: { id: assignCategoryDto.taskId },
      relations: ['project', 'project.user', 'categories'],
    });

    if (!task || task.project.user.id !== userId) {
      throw new NotFoundException(
        'Task not found or project not owned by the user',
      );
    }

    const category = await this.categoryRepository.findOne({
      where: {
        id: assignCategoryDto.categoryId,
        project: { id: task.project.id },
      },
    });

    if (!category) {
      throw new NotFoundException('Category not found in the project');
    }

    task.categories = [...task.categories, category];

    return this.taskRepository.save(task);
  }
}

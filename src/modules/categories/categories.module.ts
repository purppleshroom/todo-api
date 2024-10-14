import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { Project } from '../../db/entities/project.entity';
import { Task } from '../../db/entities/task.entity';
import { Category } from '../../db/entities/category.entity';
import { AccessTokenModule } from '../auth/jwt/access-token.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Project, Task, Category]),
    AccessTokenModule,
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}

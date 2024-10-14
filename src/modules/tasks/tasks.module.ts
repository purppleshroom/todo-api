import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { AccessTokenModule } from '../auth/jwt/access-token.module';
import { Task } from '../../db/entities/task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), AccessTokenModule],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}

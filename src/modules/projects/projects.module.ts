import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { Project } from '../../db/entities/project.entity';
import { AccessTokenModule } from '../auth/jwt/access-token.module';

@Module({
  imports: [TypeOrmModule.forFeature([Project]), AccessTokenModule],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}

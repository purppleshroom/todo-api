import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ProjectsService } from './projects.service';
import { ProjectsDto } from './dto/projects.dto';
import { AccessTokenGuard } from '../auth/jwt/guards/refresh-token.guard';

@Controller('projects')
export class ProjectsController {
  constructor(private projectService: ProjectsService) {}

  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Post()
  async create(@Body() projectsDto: ProjectsDto, @Request() req: any) {
    return this.projectService.create(req.user.userId, projectsDto);
  }
}

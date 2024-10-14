import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { AccessTokenGuard } from '../auth/jwt/guards/access-token.guard';
import { AccessTokenPayload } from '../auth/dto/access-token-payload.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private projectService: ProjectsService) {}

  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Post()
  async create(
    @Body() createProjectDto: CreateProjectDto,
    @Request() req: { user: AccessTokenPayload },
  ) {
    return this.projectService.create(req.user.sub, createProjectDto);
  }
}

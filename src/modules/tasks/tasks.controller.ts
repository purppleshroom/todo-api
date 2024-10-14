import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { AccessTokenGuard } from '../auth/jwt/guards/access-token.guard';
import { AccessTokenPayload } from '../auth/dto/access-token-payload.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Post()
  async create(
    @Body() createTaskDto: CreateTaskDto,
    @Request() req: { user: AccessTokenPayload },
  ) {
    return this.tasksService.create(req.user.sub, createTaskDto);
  }
}

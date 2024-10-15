import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { DeadlinesService } from './deadlines.service';
import { CreateDeadlineDto } from './dto/create-deadline.dto';
import { AccessTokenPayload } from '../auth/dto/access-token-payload.dto';
import { AccessTokenGuard } from '../auth/jwt/guards/access-token.guard';

@Controller('deadlines')
export class DeadlinesController {
  constructor(private readonly deadlineService: DeadlinesService) {}

  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Post()
  async createDeadline(
    @Body() createDeadlineDto: CreateDeadlineDto,
    @Request() req: { user: AccessTokenPayload },
  ) {
    return this.deadlineService.create(req.user.sub, createDeadlineDto);
  }
}

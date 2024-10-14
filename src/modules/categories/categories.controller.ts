import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { AccessTokenGuard } from '../auth/jwt/guards/access-token.guard';
import { AccessTokenPayload } from '../auth/dto/access-token-payload.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { AssignCategoryDto } from './dto/assaign-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Post()
  async create(
    @Body() createTaskDto: CreateCategoryDto,
    @Request() req: { user: AccessTokenPayload },
  ) {
    return this.categoriesService.create(req.user.sub, createTaskDto);
  }

  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Post('assign')
  async assign(
    @Body() assignCategoryDto: AssignCategoryDto,
    @Request() req: { user: AccessTokenPayload },
  ) {
    return this.categoriesService.assign(req.user.sub, assignCategoryDto);
  }
}

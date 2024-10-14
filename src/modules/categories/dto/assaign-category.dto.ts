import { IsNotEmpty } from 'class-validator';

export class AssignCategoryDto {
  @IsNotEmpty()
  taskId: number;

  @IsNotEmpty()
  categoryId: number;
}

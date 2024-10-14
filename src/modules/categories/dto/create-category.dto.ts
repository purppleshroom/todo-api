import { IsNotEmpty } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  projectId: number;

  @IsNotEmpty()
  name: string;
}

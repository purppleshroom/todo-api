import { IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  projectId: number;

  @IsNotEmpty()
  title: string;

  description?: string;
}

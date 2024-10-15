import { IsNotEmpty, IsDateString, IsInt } from 'class-validator';

export class CreateDeadlineDto {
  @IsNotEmpty()
  @IsInt()
  taskId: number;

  @IsNotEmpty()
  @IsDateString()
  deadline: string;
}

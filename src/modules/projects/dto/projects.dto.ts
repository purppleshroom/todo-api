import { IsNotEmpty, IsString } from 'class-validator';

export class ProjectsDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  description?: string;
}

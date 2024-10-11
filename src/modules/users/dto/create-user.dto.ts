import { IsEmail, IsNotEmpty, MinLength, Matches } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(16, { message: 'Password must be at least 8 characters long' })
  @Matches(/(?=(.*[0-9]){3,})(?=(.*[A-Z]){3,})(?=(.*[!@#$%^&*]){3,})/, {
    message:
      'Password must contain at least 3 numbers, 3 uppercase letters, and 3 special characters',
  })
  password: string;
}

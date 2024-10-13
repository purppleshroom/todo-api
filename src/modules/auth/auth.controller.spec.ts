import { TestBed } from '@automock/jest';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ValidationPipe } from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';

describe('AuthController', () => {
  let controller: AuthController;
  let service: jest.Mocked<AuthService>;

  beforeEach(async () => {
    const { unit, unitRef } = await TestBed.create(AuthController).compile();

    controller = unit;
    service = unitRef.get(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call auth service on sign up when right dto provided', () => {
    const mockDto = { email: 'test@email.com', password: '123456789aQWE!@#' };

    controller.signUp(mockDto);

    expect(service.signUp).toHaveBeenCalledWith(mockDto);
  });

  it('should fail when email is not provided', async () => {
    const mockDto = { email: '', password: '123456789aQWE!@#' };

    const validationPipe = new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    });

    await expect(
      validationPipe.transform(mockDto, { type: 'body', metatype: SignUpDto }),
    ).rejects.toMatchObject({
      response: {
        message: expect.arrayContaining(['email must be an email']),
      },
    });

    await expect(controller.signUp(mockDto)).resolves.toBeUndefined();
  });

  it('should fail when email is not email type', async () => {
    const mockDto = { email: 'com.email@', password: '123456789aQWE!@#' };

    const validationPipe = new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    });

    await expect(
      validationPipe.transform(mockDto, { type: 'body', metatype: SignUpDto }),
    ).rejects.toMatchObject({
      response: {
        message: expect.arrayContaining(['email must be an email']),
      },
    });

    await expect(controller.signUp(mockDto)).resolves.toBeUndefined();
  });

  it('should fail when password is empty', async () => {
    const mockDto = { email: 'test@email.com', password: '' };

    const validationPipe = new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    });

    await expect(
      validationPipe.transform(mockDto, { type: 'body', metatype: SignUpDto }),
    ).rejects.toMatchObject({
      response: {
        message: expect.arrayContaining([
          'Password must contain at least 3 numbers, 3 uppercase letters, and 3 special characters',
          'Password must be at least 16 characters long',
          'password should not be empty',
        ]),
      },
    });

    await expect(controller.signUp(mockDto)).resolves.toBeUndefined();
  });

  it('should fail when password is not 16 chars long', async () => {
    const mockDto = { email: 'test@email.com', password: '123aQWE!@#' };

    const validationPipe = new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    });

    await expect(
      validationPipe.transform(mockDto, { type: 'body', metatype: SignUpDto }),
    ).rejects.toMatchObject({
      response: {
        message: expect.arrayContaining([
          'Password must be at least 16 characters long',
        ]),
      },
    });

    await expect(controller.signUp(mockDto)).resolves.toBeUndefined();
  });

  it('should fail when password does not meet char requirements', async () => {
    const mockDto = { email: 'test@email.com', password: '1234567890123456' };

    const validationPipe = new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    });

    await expect(
      validationPipe.transform(mockDto, { type: 'body', metatype: SignUpDto }),
    ).rejects.toMatchObject({
      response: {
        message: expect.arrayContaining([
          'Password must contain at least 3 numbers, 3 uppercase letters, and 3 special characters',
        ]),
      },
    });

    await expect(controller.signUp(mockDto)).resolves.toBeUndefined();
  });
});

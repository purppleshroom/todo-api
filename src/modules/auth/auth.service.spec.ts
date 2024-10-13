/* eslint-disable @typescript-eslint/no-unused-vars */
import { TestBed } from '@automock/jest';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { MailerService } from '../mailer/mailer.service';
import { RefreshToken } from '../../db/entities/refresh-token.entity';

describe('AuthService', () => {
  let service: AuthService;
  let configService: jest.Mocked<ConfigService>;
  let accessJwtService: jest.Mocked<JwtService>;
  let refreshJwtService: jest.Mocked<JwtService>;
  let userService: jest.Mocked<UsersService>;
  let mailerService: jest.Mocked<MailerService>;
  let refreshRepository: jest.Mocked<Repository<RefreshToken>>;

  beforeEach(async () => {
    const { unit, unitRef } = await TestBed.create(AuthService).compile();

    service = unit;
    configService = unitRef.get<ConfigService>(ConfigService);
    accessJwtService = unitRef.get<JwtService>('AccessTokenService');
    refreshJwtService = unitRef.get<JwtService>('RefreshTokenService');
    userService = unitRef.get<UsersService>(UsersService);
    mailerService = unitRef.get<MailerService>(MailerService);
    refreshRepository = unitRef.get<Repository<RefreshToken>>(
      'RefreshTokenRepository',
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

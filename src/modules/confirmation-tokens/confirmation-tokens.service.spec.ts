import { TestBed } from '@automock/jest';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';

import { ConfirmationTokensService } from './confirmation-tokens.service';
import { UsersService } from '../users/users.service';
import { ConfirmationToken } from '../../db/entities/confirmation-token.entity';
import { User } from 'src/db/entities/user.entity';

jest.mock('ms', () => ({
  ...jest.requireActual('ms'),
  __esModule: true,
  default: jest.fn().mockReturnValue(100000),
}));

jest.mock('crypto', () => ({
  randomBytes: jest.fn(() => Buffer.from('mockRandomBytesToken', 'utf-8')),
}));

describe('ConfirmationTokenService', () => {
  let service: ConfirmationTokensService;
  let configService: jest.Mocked<ConfigService>;
  let usersService: jest.Mocked<UsersService>;
  let confirmationTokenRepository: jest.Mocked<Repository<ConfirmationToken>>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(
      ConfirmationTokensService,
    ).compile();

    service = unit;
    configService = unitRef.get(ConfigService);
    usersService = unitRef.get(UsersService);
    confirmationTokenRepository = unitRef.get<Repository<ConfirmationToken>>(
      'ConfirmationTokenRepository',
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create confirmation token in db', async () => {
    const userId = 1;

    const mockToken = 'mockRandomBytesToken';

    configService.getOrThrow.mockImplementation((key: string) => {
      switch (key) {
        case 'CONFIRMATION_MAIL_EXPIRATION':
          return '1d';
        default:
          throw new Error(`Unknown key: ${key}`);
      }
    });

    confirmationTokenRepository.create.mockReturnValue({
      token: mockToken,
      id: 0,
      user: {
        id: userId,
        email: '',
        password: '',
        emailConfirmed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      used: false,
      expirationDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    confirmationTokenRepository.save.mockResolvedValue({
      token: mockToken,
      id: 0,
      user: {
        id: userId,
        email: '',
        password: '',
        emailConfirmed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      used: false,
      expirationDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const result = await service.create(userId);
    expect(result).toBe(mockToken);
  });

  it('should confirm email if token exists and token is not expired', async () => {
    const mockToken = 'mockRandomBytesToken';

    confirmationTokenRepository.findOne.mockResolvedValue({
      id: 263108344533934,
      token: mockToken,
      used: false,
      user: {
        id: 1,
      } as User,
      expirationDate: new Date(Date.now() + 100000),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    usersService.confirmUser.mockResolvedValue();

    await service.confirmEmail(mockToken);

    expect(usersService.confirmUser).toHaveBeenCalledWith({ id: 1 });
  });

  it('should not confirm email if token does not exist', async () => {
    const mockToken = 'mockRandomBytesToken';

    confirmationTokenRepository.findOne.mockResolvedValue(null);

    await expect(service.confirmEmail(mockToken)).rejects.toThrow(
      'Token with ID mockRandomBytesToken not found',
    );

    expect(usersService.confirmUser).not.toHaveBeenCalled();
  });

  it('should not confirm email if token is expired', async () => {
    const mockToken = 'mockRandomBytesToken';

    confirmationTokenRepository.findOne.mockResolvedValue({
      id: 263108344533934,
      token: mockToken,
      used: false,
      user: {
        id: 1,
      } as User,
      expirationDate: new Date(Date.now() - 100000),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await expect(service.confirmEmail(mockToken)).rejects.toThrow(
      'Token has expired',
    );

    expect(usersService.confirmUser).not.toHaveBeenCalled();
  });
});

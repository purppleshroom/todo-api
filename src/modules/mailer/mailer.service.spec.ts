/* eslint-disable @typescript-eslint/no-unused-vars */
import { TestBed } from '@automock/jest';
import { MailerService } from './mailer.service';
import { ConfigService } from '@nestjs/config';
import { ConfirmationTokensService } from '../confirmation-tokens/confirmation-tokens.service';

describe('MailerService', () => {
  let service: MailerService;
  let configService: jest.Mocked<ConfigService>;
  let confirmationTokensService: jest.Mocked<ConfirmationTokensService>;

  beforeEach(async () => {
    const { unit, unitRef } = await TestBed.create(MailerService).compile();

    service = unit;
    configService = unitRef.get<ConfigService>(ConfigService);
    confirmationTokensService = unitRef.get<ConfirmationTokensService>(
      ConfirmationTokensService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

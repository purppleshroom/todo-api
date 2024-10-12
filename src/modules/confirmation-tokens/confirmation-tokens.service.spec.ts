import { Test, TestingModule } from '@nestjs/testing';
import { ConfirmationTokensService } from './confirmation-tokens.service';

describe('ConfirmationTokensService', () => {
  let service: ConfirmationTokensService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfirmationTokensService],
    }).compile();

    service = module.get<ConfirmationTokensService>(ConfirmationTokensService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { ConfirmationTokensController } from './confirmation-tokens.controller';

describe('ConfirmationTokensController', () => {
  let controller: ConfirmationTokensController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConfirmationTokensController],
    }).compile();

    controller = module.get<ConfirmationTokensController>(
      ConfirmationTokensController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

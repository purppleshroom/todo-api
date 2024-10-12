import { TestBed } from '@automock/jest';
import { ConfirmationTokensController } from './confirmation-tokens.controller';
import { ConfirmationTokensService } from './confirmation-tokens.service';

describe('ConfirmationTokensController', () => {
  let controller: ConfirmationTokensController;
  let service: jest.Mocked<ConfirmationTokensService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(
      ConfirmationTokensController,
    ).compile();

    controller = unit;
    service = unitRef.get(ConfirmationTokensService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should confirm email', () => {
    const mockToken = '123456';

    service.confirmEmail.mockResolvedValue();

    controller.confirmEmail(mockToken);

    expect(service.confirmEmail).toHaveBeenCalled();
  });
});

import { Controller, Get, Query } from '@nestjs/common';
import { ConfirmationTokensService } from './confirmation-tokens.service';

@Controller('confirmation-tokens')
export class ConfirmationTokensController {
  constructor(
    private readonly confirmationTokensService: ConfirmationTokensService,
  ) {}

  @Get('confirm-email')
  async confirmEmail(@Query('token') token: string) {
    return this.confirmationTokensService.confirmEmail(token);
  }
}

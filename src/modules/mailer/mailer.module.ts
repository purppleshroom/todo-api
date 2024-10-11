import { Module } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { ConfigModule } from '@nestjs/config';
import { ConfirmationTokensModule } from '../confirmation-tokens/confirmation-tokens.module';

@Module({
  imports: [ConfigModule, ConfirmationTokensModule],
  providers: [MailerService],
  exports: [MailerService],
})
export class MailerModule {}

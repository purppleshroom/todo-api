import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { ConfirmationTokensService } from './confirmation-tokens.service';
import { ConfirmationTokensController } from './confirmation-tokens.controller';
import { ConfirmationToken } from '../../db/entities/confirmation-token.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    ConfigModule,
    UsersModule,
    TypeOrmModule.forFeature([ConfirmationToken]),
  ],
  providers: [ConfirmationTokensService],
  controllers: [ConfirmationTokensController],
  exports: [ConfirmationTokensService],
})
export class ConfirmationTokensModule {}

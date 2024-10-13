import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from '../../db/entities/user.entity';
import { RefreshToken } from '../../db/entities/refresh-token.entity';
import { MailerModule } from '../mailer/mailer.module';
import { ConfirmationTokensModule } from '../confirmation-tokens/confirmation-tokens.module';
import { UsersModule } from '../users/users.module';
import { AccessTokenModule } from './jwt/access-token.module';
import { RefreshTokenModule } from './jwt/refresh-token.module';

@Module({
  imports: [
    ConfigModule,
    MailerModule,
    UsersModule,
    AccessTokenModule,
    RefreshTokenModule,
    ConfirmationTokensModule,
    TypeOrmModule.forFeature([User, RefreshToken]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}

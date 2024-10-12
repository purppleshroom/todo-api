import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { User } from '../../db/entities/user.entity';
import { RefreshToken } from '../../db/entities/refresh-token.entity';
import { MailerModule } from '../mailer/mailer.module';
import { ConfirmationTokensModule } from '../confirmation-tokens/confirmation-tokens.module';
import { UsersModule } from '../users/users.module';
import { AccessTokenStrategy } from './strategies/access-token.strategy';
import { AccessTokenGuard } from './guards/refresh-token.guard';
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';
import { RefreshTokenGuard } from './guards/access-token.guard';

@Module({
  imports: [
    ConfigModule,
    MailerModule,
    UsersModule,
    ConfirmationTokensModule,
    TypeOrmModule.forFeature([User, RefreshToken]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.getOrThrow<string>('JWT_ACCESS_TOKEN_SECRET'),
        signOptions: {
          expiresIn: configService.getOrThrow<string>(
            'JWT_ACCESS_TOKEN_EXPIRATION',
          ),
        },
      }),
    }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.getOrThrow<string>('JWT_REFRESH_TOKEN_SECRET'),
        signOptions: {
          expiresIn: configService.getOrThrow<string>(
            'JWT_REFRESH_TOKEN_EXPIRATION',
          ),
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AccessTokenStrategy,
    AccessTokenGuard,
    RefreshTokenStrategy,
    RefreshTokenGuard,
    {
      provide: 'ACCESS_JWT_SERVICE',
      useExisting: JwtService,
    },
    {
      provide: 'REFRESH_JWT_SERVICE',
      useExisting: JwtService,
    },
  ],
  exports: [AccessTokenGuard],
})
export class AuthModule {}

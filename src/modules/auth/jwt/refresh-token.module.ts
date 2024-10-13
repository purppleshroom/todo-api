import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
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
  providers: [
    RefreshTokenStrategy,
    {
      provide: 'RefreshTokenService',
      useExisting: JwtService,
    },
  ],
  exports: ['RefreshTokenService'],
})
export class RefreshTokenModule {}

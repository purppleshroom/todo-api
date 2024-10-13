import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AccessTokenStrategy } from './strategies/access-token.strategy';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.getOrThrow<string>('JWT_ACCESS_TOKEN_SECRET'),
        signOptions: {
          expiresIn: configService.getOrThrow<string>(
            'JWT_ACCESS_TOKEN_EXPIRATION',
          ),
        },
      }),
    }),
  ],
  providers: [
    AccessTokenStrategy,
    {
      provide: 'AccessTokenService',
      useExisting: JwtService,
    },
  ],
  exports: ['AccessTokenService'],
})
export class AccessTokenModule {}

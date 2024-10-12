import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { compare } from 'bcrypt';
import ms from 'ms';

import { User } from '../../db/entities/user.entity';
import { RefreshToken } from '../../db/entities/refresh-token.entity';
import { SignUpDto } from '../auth/dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { RefreshAccessTokenDto } from './dto/refresh-access-token.dto';
import { MailerService } from '../mailer/mailer.service';
import { UsersService } from '../users/users.service';

interface TokenPayload {
  sub: number;
  exp: string;
}

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private accessJwtService: JwtService,
    private refreshJwtService: JwtService,
    private userService: UsersService,
    private mailerService: MailerService,
    @InjectRepository(RefreshToken)
    private refreshRepository: Repository<RefreshToken>,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<void> {
    const user = await this.userService.create(signUpDto);

    await this.mailerService.sendConfirmationEmail(user.id, user.email);

    return;
  }

  async signIn(
    signInDto: SignInDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const { email, password } = signInDto;

    const user = await this.userService.findByEmail(email);

    if (!user?.password || !(await compare(password, user.password))) {
      throw new UnauthorizedException();
    }

    const accessTokenPayload = await this.createAccessToken(user);
    const refreshTokenPayload = await this.createRefreshToken(user);

    await this.refreshRepository.create(refreshTokenPayload);

    return {
      accessToken: accessTokenPayload.token,
      refreshToken: refreshTokenPayload.token,
    };
  }

  async logout(refreshTokenDto: RefreshAccessTokenDto) {
    console.log(refreshTokenDto, 'logout');
  }

  async refreshAccessToken(refreshAccessTokenDto: RefreshAccessTokenDto) {
    const refreshToken = refreshAccessTokenDto.refreshToken;
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token is invalid');
    }

    try {
      await this.validateRefreshToken(refreshToken);

      const refreshTokenUser = await this.refreshRepository.findOne({
        where: {
          token: refreshToken,
        },
        relations: ['user'],
      });

      if (!refreshTokenUser || refreshTokenUser.invalidated) {
        throw new UnauthorizedException('Refresh token is invalid');
      }

      return this.createAccessToken(refreshTokenUser.user);
    } catch (error) {
      console.error(error);
      throw new UnauthorizedException('Refresh token is invalid');
    }
  }

  private async createAccessToken(user: User) {
    const accessTokenDuration = this.configService.getOrThrow<string>(
      'JWT_ACCESS_TOKEN_EXPIRATION',
    );

    const accessTokenExpirationDate = new Date(
      Date.now() + ms(accessTokenDuration),
    );

    const payload = {
      sub: user.id,
      exp: accessTokenExpirationDate,
    };

    return {
      token: this.accessJwtService.sign(payload),
      expirationDate: accessTokenExpirationDate,
    };
  }

  private async createRefreshToken(user: User) {
    const refreshTokenDuration = this.configService.getOrThrow<string>(
      'JWT_REFRESH_TOKEN_EXPIRATION',
    );

    const refreshTokenExpirationDate = new Date(
      Date.now() + ms(refreshTokenDuration),
    );

    const payload = {
      sub: user.id,
      exp: refreshTokenExpirationDate,
    };

    return {
      token: this.refreshJwtService.sign(payload),
      expirationDate: refreshTokenExpirationDate,
    };
  }

  private async validateRefreshToken(token: string): Promise<TokenPayload> {
    return this.refreshJwtService.verify<TokenPayload>(token);
  }
}

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Strategy, ExtractJwt, JwtFromRequestFunction } from 'passport-jwt';
import { RefreshTokenPayload } from '../../dto/refresh-token-payload.dto';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'refresh-token',
) {
  private jwtExtractor: JwtFromRequestFunction<any>;

  constructor(private configService: ConfigService) {
    const jwtExtractor = ExtractJwt.fromAuthHeaderAsBearerToken();

    super({
      jwtFromRequest: jwtExtractor,
      secretOrKey: configService.getOrThrow<string>('JWT_REFRESH_TOKEN_SECRET'),
      ignoreExpiration: false,
      passReqToCallback: true,
    });

    this.jwtExtractor = jwtExtractor;
  }

  async validate(
    req: Request,
    payload: RefreshTokenPayload,
  ): Promise<RefreshTokenPayload> {
    const token = this.jwtExtractor(req);

    if (!token) {
      throw new UnauthorizedException('Issue extracting token');
    }

    return { sub: payload.sub, exp: payload.exp, token };
  }
}

import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { AuthService } from './auth.service';
import { RefreshTokenGuard } from './jwt/guards/access-token.guard';
import { ExtractJwt } from 'passport-jwt';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  async signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @Post('sign-in')
  async signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @ApiBearerAuth()
  @UseGuards(RefreshTokenGuard)
  @Post('refresh-access-token')
  async refreshAccessToken(@Request() req: any) {
    const token = (await ExtractJwt.fromAuthHeaderAsBearerToken()(
      req,
    )) as string;
    return this.authService.refreshAccessToken(req.user.userId, token);
  }

  @ApiBearerAuth()
  @UseGuards(RefreshTokenGuard)
  @Post('logout')
  async logout(@Request() req: any) {
    const token = (await ExtractJwt.fromAuthHeaderAsBearerToken()(
      req,
    )) as string;
    return this.authService.logout(req.user.userId, token);
  }
}

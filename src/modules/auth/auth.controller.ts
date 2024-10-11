import { Controller, Post, Body } from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { RefreshAccessTokenDto } from './dto/refresh-access-token.dto';
import { AuthService } from './auth.service';

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

  @Post('refresh-access-token')
  async refreshAccessToken(
    @Body() refreshAccessTokenDto: RefreshAccessTokenDto,
  ) {
    return this.authService.refreshAccessToken(refreshAccessTokenDto);
  }

  @Post('logout')
  async logout(@Body() refreshAccessTokenDto: RefreshAccessTokenDto) {
    return this.authService.logout(refreshAccessTokenDto);
  }
}

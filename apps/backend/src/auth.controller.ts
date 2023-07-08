import { Controller, Get, Query } from '@nestjs/common';
import { GoogleAuthService } from './google-auth.service';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: GoogleAuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Get('validate')
  async validateToken(
    @Query('token') token: string,
  ): Promise<{ access_token: string }> {
    const isValid = await this.authService.validateUser(token);

    if (isValid) {
      const jwt = await this.authService.validateUser(token);
      return jwt;
    } else {
      return { access_token: 'Token inválido' };
    }
  }
}

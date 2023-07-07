import { Controller, Get, Query } from '@nestjs/common';

import { GoogleAuthService } from './google-auth-service.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: GoogleAuthService) {}

  @Get('validate')
  async validateToken(@Query('token') token: string): Promise<string> {
    const isValid = await this.authService.validateUser(token);

    if (isValid) {
      return 'Token válido';
    } else {
      return 'Token inválido';
    }
  }
}

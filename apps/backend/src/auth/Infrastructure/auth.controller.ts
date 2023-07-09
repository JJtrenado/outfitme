import { Controller, Get, Query } from '@nestjs/common';
import { generateJwt } from '../Application/generateJwt.service';
import { getPayloadFromToken } from './getPayloadFromToken';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: generateJwt) {}

  @Get('getJwtFromGoogleToken')
  async getJwtFromGoogleToken(
    @Query('token') token: string,
  ): Promise<{ jwt: string }> {
    const { payload } = await getPayloadFromToken(token);
    const jwt = await this.authService.generateJwt(token, payload);

    if (jwt) return jwt;
    return { jwt: 'Token inválido' };
  }
}

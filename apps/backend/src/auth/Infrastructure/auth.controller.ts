import { Controller, Get, Query } from '@nestjs/common';
import { generateJwt } from '../Application/generateJwt.service';
import { getPayload } from './getPayload.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly jwtService: generateJwt,
    private readonly payloadService: getPayload,
  ) {}

  @Get('getJwtFromGoogleToken')
  async getJwtFromGoogleToken(
    @Query('token') token: string,
  ): Promise<{ jwt: string }> {
    const { payload } = await this.payloadService.getPayload(token);
    const jwt = await this.jwtService.generateJwt(token, payload);

    if (jwt) return jwt;
    return { jwt: 'Token inválido' };
  }
}

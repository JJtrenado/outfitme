import { Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './barCode.service';

@Controller('users')
export class UsersController {
  constructor(private readonly authService: AuthService) {}

  @Post('profile')
  async postProfile(@Req() request: Request) {
    const token = request.headers.authorization?.split(' ')[1];
    if (token) {
      const decoded = await this.authService.verifyToken(token);
      if (decoded) {
        // El token es válido, puedes acceder a la información
        const userId = decoded.sub;
        // ...
        console.log('hola');
        return { userId };
      }
    }
    // El token no es válido o no está presente
    console.log('adios');
    return { message: 'Token inválido' };
  }
}

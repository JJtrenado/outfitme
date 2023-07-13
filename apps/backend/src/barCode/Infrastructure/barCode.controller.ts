import { Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { authService } from '../../auth/Infrastructure/auth.service';
import { User } from 'src/common/Domain/User';

@Controller('users')
export class UsersController {
  constructor(private readonly AuthService: authService) {}

  @Post('profile')
  async postProfile(@Req() request: Request) {
    const token = request.headers.authorization?.split(' ')[1];
    if (token) {
      const decoded = await this.AuthService.verifyToken(token);
      if (decoded) {
        const user = decoded as User;
        return { user };
      }
    }
    return { message: 'Token inválido' };
  }
}

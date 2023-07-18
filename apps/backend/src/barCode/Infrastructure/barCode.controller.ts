import { Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { verifyJwtService } from 'src/common/Infrastructure/verifyJwt.service';
import { User } from 'src/common/Domain/User';

@Controller('users')
export class UsersController {
  constructor(private readonly VerifyJwtService: verifyJwtService) {}

  @Post('profile')
  async postProfile(@Req() request: Request) {
    const jwt = request.headers.authorization?.split(' ')[1];
    if (jwt) {
      const decoded = await this.VerifyJwtService.verifyJwt(jwt);
      if (decoded) {
        const user = decoded as User;
        return { user };
      }
    }
    return { message: 'jwt inválido' };
  }
}

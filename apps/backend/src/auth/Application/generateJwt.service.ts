import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/common/Domain/User';

@Injectable()
export class generateJwt {
  constructor(private readonly jwtService: JwtService) {}

  async generateJwt(token: string, payload: User): Promise<{ jwt: string }> {
    const jwt = this.jwtService.sign(payload); // this generates the JWT

    return { jwt };
  }
}

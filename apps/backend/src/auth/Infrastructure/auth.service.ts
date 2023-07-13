import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/common/Domain/User';

@Injectable()
export class authService {
  constructor(private readonly jwtService: JwtService) {}

  async generateJwtfromUser(user: User): Promise<{ jwt: string }> {
    const jwt = this.jwtService.sign(user);
    return { jwt };
  }

  verifyToken(token: string) {
    try {
      const decoded = this.jwtService.verify(token);
      return decoded;
    } catch (error) {
      return null;
    }
  }
}

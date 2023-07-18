import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class verifyJwtService {
  constructor(private readonly jwtService: JwtService) {}

  verifyJwt(jwt: string) {
    try {
      const decoded = this.jwtService.verify(jwt);
      return decoded;
    } catch (error) {
      return console.error('cant verify jwt, error:', error);
    }
  }
}

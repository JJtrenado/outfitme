import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class GoogleAuthService {
  constructor(private readonly jwtService: JwtService) {}
  public async validateUser(token: string): Promise<{ access_token: string }> {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${token}`,
      );
      const userData = response.data;
      console.log('Datos de usuario de Google:', userData);

      // Generar el JWT
      const payload = {
        user_id: userData.user_id,
        email: userData.email,
        token,
      };
      const access_token = this.jwtService.sign(payload);

      return { access_token };
    } catch (error) {
      console.error(
        'Error al validar el token de Google:',
        error.response.data,
      );
      return;
    }
  }
}

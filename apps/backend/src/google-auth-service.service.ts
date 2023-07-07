import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class GoogleAuthService {
  async validateUser(token: string): Promise<boolean> {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${token}`,
      );
      const userData = response.data;
      console.log('Datos de usuario de Google:', userData);

      // Aquí puedes realizar cualquier verificación adicional que necesites
      // basándote en los datos de usuario devueltos por Google

      return true; // Usuario válido
    } catch (error) {
      console.error(
        'Error al validar el token de Google:',
        error.response.data,
      );
      return false; // Usuario no válido
    }
  }
}

import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { User } from 'src/common/Domain/User';

@Injectable()
export class getPayload {
  async getPayload(token: string): Promise<{ payload: User }> {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${token}`,
      );

      const payload: User = {
        id: response.data.user_id,
        email: response.data.email,
        token,
      };

      return { payload };
    } catch (error) {
      console.error(
        'Error al validar el token de Google:',
        error.response?.data,
      );
      throw new Error('Error al validar el token de Google');
    }
  }
}

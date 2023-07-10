import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import { IGoogleService } from '../Application/getUser.service';

@Injectable()
export class GoogleService implements IGoogleService {
  async getUserInfo(token: string): Promise<any> {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${token}`,
      );
      return response.data;
    } catch (error) {
      // Maneja el error y devuelve un resultado apropiado
      if (error.response && error.response.status === 400) {
        throw new HttpException('Invalid Token', HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(
        'Error getting user info from Google',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

import { Injectable, Inject } from '@nestjs/common';
import { User } from 'src/common/Domain/User';
import { IGoogleService } from './googleService.interface'; // Importa correctamente la interfaz

@Injectable()
export class getUser {
  constructor(
    @Inject('IGoogleService') // Utiliza el decorador @Inject con el nombre del proveedor
    private readonly googleService: IGoogleService,
  ) {}

  async fromToken(token: string): Promise<{ user: User }> {
    const response = await this.googleService.getUserInfo(token);
    const user: User = {
      id: response.user_id,
      email: response.email,
      token,
    };
    return { user };
  }
}
export { IGoogleService };

import { Injectable, Inject } from '@nestjs/common';
import { User } from 'src/common/Domain/User';
import { IExternalUserService } from './googleService.interface';

@Injectable()
export class getUser {
  constructor(
    @Inject('IGoogleService')
    private readonly externalUserService: IExternalUserService,
  ) {}

  async fromToken(token: string): Promise<{ user: User }> {
    const response = await this.externalUserService.getUserInfo(token);
    const user: User = {
      id: response.user_id,
      email: response.email,
      token,
    };
    return { user };
  }
}
export { IExternalUserService };

import { Injectable, Inject } from '@nestjs/common';
import { User } from 'src/common/user/Domain/User';
import { IGoogleService } from './googleService.interface';

@Injectable()
export class getUser {
  constructor(
    @Inject('IGoogleService')
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

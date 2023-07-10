export interface IGoogleService {
  getUserInfo(token: string): Promise<any>;
}

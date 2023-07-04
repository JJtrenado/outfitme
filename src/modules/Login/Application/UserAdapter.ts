import { EndpointUser, User } from '../Domain/User';

export const UserAdapter = (endpointUser: EndpointUser): User =>{
    const user: User = {
      email: endpointUser.email,
      name: endpointUser.name,
      picture: endpointUser.picture,
      token: endpointUser.token,
    };
    return user;
  };
import { EndpointUser, User } from '../Domain/User';

export const UserAdapter = (endpointUser: EndpointUser): User =>{
    const formattedUser: User = {
      email: endpointUser.email,
      name: endpointUser.name,
      picture: endpointUser.picture,
      token: endpointUser.token,
    };
    return formattedUser;
  };
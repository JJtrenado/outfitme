import { EndpointUser } from "../Domain/User";

  //obtiene la informacion de usuario de google y la guarda en local
  export const getUserInfoFromGoogle = async (token): Promise<EndpointUser> => {
    if (!token) return;
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
        );
        
      const endpointUser:EndpointUser = await response.json();
      endpointUser.token = token; //añado el token a la info de usuario
      return endpointUser;
    } catch (error) {
      // Add error handler
    }
  };

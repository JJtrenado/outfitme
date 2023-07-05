import { EndpointUser, User } from "../Domain/User";
import { getUserInfoFromGoogle } from "../Infraestructure/GoogleLogin";
import { getLocalUser, saveLocalUser } from "../Infraestructure/LocalStorageUser";
import { UserAdapter } from "./UserAdapter";

export async function getLocalUserOrFetchFromGoogle(response) :Promise<User> {
    let user: User = await getLocalUser();
    if (!user) {
      if (response?.type === "success") {
        const endpointUser: EndpointUser = await getUserInfoFromGoogle(response.authentication.accessToken);
        user = UserAdapter(endpointUser);
        saveLocalUser(user);
      }
    }
    else {
      console.log("loaded locally");
    }
    return user;
  }
import { EndpointUser, User } from "../Domain/User";
import { fetchUserInfoFromGoogle } from "../Infraestructure/fetchUserInfoFromGoogle";
import { getLocalUser, saveLocalUser } from "../Infraestructure/LocalStorageUser";
import { UserAdapter } from "./UserAdapter";

export async function getLocalUserOrFetchFromGoogle(response) :Promise<User> {
    let user: User = await getLocalUser();
    if (!user) {
      if (response?.type === "success") {
        const endpointUser: EndpointUser = await fetchUserInfoFromGoogle(response.authentication.accessToken);
        user = UserAdapter(endpointUser);
        saveLocalUser(user);
      }
      else {
        throw new Error("User not logged in");
      }
    }
    return user;
  }
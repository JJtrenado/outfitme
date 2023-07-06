import { AuthSessionResult } from "expo-auth-session";
import { EndpointUser, User } from "../Domain/User";
import { fetchUserInfoFromGoogle } from "../Infraestructure/FetchUserInfoFromGoogle";
import { getLocalUser, saveLocalUser } from "../Infraestructure/LocalStorageUser";
import { UserAdapter } from "./UserAdapter";

/**
 * probes if the user is logged in(storaged in local), if not, fetches the user from google
 *
 * @param {AuthSessionResult} response response object obtained from the useAuthRequest hook provided by the Google API
 * @return {Promise<User>} user from local storage or from google
 */
export async function getLocalUserOrFetchFromGoogle(response: AuthSessionResult) :Promise<User> {
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
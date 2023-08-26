import { AuthSessionResult } from "expo-auth-session";
import { EndpointUser, User } from "../Domain/User";
import { fetchUserFromGoogle } from "./FetchUserFromGoogle";
import { getLocalUser, saveLocalUser } from "./LocalStorageUser";
import { UserAdapter } from "../Application/UserAdapter";

/**
 * probes if the user is logged in(storaged in local), if not, fetches the user from google
 *
 * @param {AuthSessionResult} response response object obtained from the useAuthRequest hook provided by the Google API
 * @return {Promise<User>} user from local storage or from google
 */
export async function getUser(response: AuthSessionResult) :Promise<User> {
  let user: User = await getLocalUser();

  if(!user && response?.type === "success") {
    const endpointUser: EndpointUser = await fetchUserFromGoogle(response.authentication.accessToken);
    user = UserAdapter(endpointUser);
    saveLocalUser(user);
  }

  if(!user && response?.type != "success") throw new Error("User not logged in");
  
  return user;
}
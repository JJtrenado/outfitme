import { AuthSessionResult } from "expo-auth-session";
import { EndpointUser, User } from "../Domain/User";
import { fetchUserFromGoogle } from "./FetchUserFromGoogle";
import { getLocalUser, saveLocalUser } from "./LocalStorageUser";
import { UserAdapter } from "../Application/UserAdapter";
import { getJwtFromBackend } from "./getJwt";

async function addJwt(user: User, token: string) :Promise<User> {
  const jwt: string = await getJwtFromBackend(token);
  if(!jwt) throw new Error("Error validating user from backend");
  user.jwt = jwt;
  return user;
}

async function getUserFromGoogle(response: AuthSessionResult) :Promise<User> {
  if(response?.type === "success") {
    const endpointUser: EndpointUser = await fetchUserFromGoogle(response.authentication.accessToken);
    let user = UserAdapter(endpointUser);

    user = await addJwt(user, response.authentication.accessToken);
    return user;
  }
  throw new Error("User not logged in");
}

/**
 * probes if the user is logged in(storaged in local), if not, fetches the user from google
 *
 * @param {AuthSessionResult} response response object obtained from the useAuthRequest hook provided by the Google API
 * @return {Promise<User>} user from local storage or from google
 */
export async function getUser(response: AuthSessionResult) :Promise<User> {
  let user: User = await getLocalUser();

  if(!user) {
    user = await getUserFromGoogle(response);
    saveLocalUser(user);
  }
  
  return user;
}
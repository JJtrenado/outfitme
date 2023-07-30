import { BACKEND_URL }from '@env';
import axios from "axios";

export async function getJwtFromBackend(token: string): Promise<string> {
  try {
    const API = axios.create({
      baseURL: BACKEND_URL,
      withCredentials: true,
    });

    const response = await API.get(`/auth/getJwtFromGoogleToken?token=${token}`);
    const responseData = response.data;
    return responseData;
  } catch (error) {
    console.error("Error validating user from Google:", error);
  }
}

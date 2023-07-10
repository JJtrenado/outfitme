import axios from "axios";

export async function getJwtFromBackend(token: string): Promise<string> {
  try {
    const API = axios.create({
      baseURL: "http://192.168.1.19:3000",
      withCredentials: true,
    });

    const response = await API.get(`/auth/getJwtFromGoogleToken?token=${token}`);
    const responseData = response.data;
    return responseData;
  } catch (error) {
    console.error("Error validating user from Google:", error);
  }
}

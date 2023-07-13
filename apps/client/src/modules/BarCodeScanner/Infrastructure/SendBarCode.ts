import axios from "axios";

export async function SendBarCode(jwt: string, barCode: string): Promise<string> {
  try {
    const API = axios.create({
      baseURL: "http://192.168.1.19:3000/users/profile",
      withCredentials: true,
    });
    const headers = {
      Authorization: `Bearer ${jwt}`,
    };
    const response = await axios.post("http://192.168.1.19:3000/users/profile", barCode, { headers });
    return response.data;
  } catch (error) {
    console.error("Error validating user from Google:", error);
  }
}
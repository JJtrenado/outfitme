import axios from "axios";

export async function validateToken(token: string): Promise<string> {
  try {
    const API = axios.create({
      baseURL: "http://localhost:3000",
      withCredentials: true,
    });

    const response = await API.get(`/auth/validate?token=${token}`);
    const responseData = response.data;
    console.log(responseData);
    return responseData;
  } catch (error) {
    console.error("Error validating user from Google:", error);
  }
}

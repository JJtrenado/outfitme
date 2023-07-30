// @ts-ignore
import { BACKEND_URL }from '@env';
import axios from "axios";

export async function NewGarment(jwt: string, data: JSON): Promise<string> {
  try {
    const headers = {
      Authorization: `Bearer ${jwt}`,
    };
    const response = await axios.post(`${BACKEND_URL}/garments`, data, { headers });
    return response.data;
  } catch (error) {
    console.error("Error validating user from Google:", error);
  }
}
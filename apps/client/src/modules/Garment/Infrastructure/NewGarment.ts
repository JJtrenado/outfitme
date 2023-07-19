import axios from "axios";

export async function NewGarment(jwt: string, data: JSON): Promise<string> {
  try {
    const headers = {
      Authorization: `Bearer ${jwt}`,
    };
    const response = await axios.post("http://192.168.1.19:3000/garments", data, { headers });
    return response.data;
  } catch (error) {
    console.error("Error validating user from Google:", error);
  }
}
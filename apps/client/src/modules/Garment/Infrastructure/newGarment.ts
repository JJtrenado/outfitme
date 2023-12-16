// @ts-ignore
import { BACKEND_URL }from '@env';

export const uploadData = async (jwt: string, formData: FormData): Promise<boolean> =>{
  try {
    const headers = {
      Authorization: `Bearer ${jwt}`,
    };

    let bodyContent = new FormData();
    bodyContent= formData;
    const uploadResponse = await fetch(`${BACKEND_URL}/garments`, {
      method: "POST",
      body: bodyContent,
      headers: headers,
    });

    if (uploadResponse.status >= 200 && uploadResponse.status < 300) {
      return true;
    }
    return false;

  } catch (error) {
    console.error("Error:", error);
    return false;
  }
};

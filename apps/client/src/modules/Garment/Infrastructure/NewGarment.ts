// @ts-ignore
import { BACKEND_URL }from '@env';

export const uploadData = async (jwt: string, formData: FormData) => {
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

    const data = await uploadResponse.text();
    console.log(data);
  } catch (error) {
    console.error("Error:", error);
  }
};

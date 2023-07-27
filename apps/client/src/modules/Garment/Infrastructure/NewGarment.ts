export const uploadData = async (jwt: string, formData: FormData) => {
  try {
    const headers = {
      Authorization: `Bearer ${jwt}`,
    };

    let bodyContent = new FormData();
    bodyContent= formData;
    const uploadResponse = await fetch("http://192.168.1.19:3000/garments", {
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

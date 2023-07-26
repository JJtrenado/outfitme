export const uploadData = async (jwt: string, _data: JSON, imagePath: any) => {
  try {
    const headers = {
      Authorization: `Bearer ${jwt}`,
    };

    const response = await fetch(imagePath); // Fetch the file as a Blob
    const fileBlob = await response.blob();

    let bodyContent = new FormData();
    bodyContent.append("file", fileBlob);
    Object.keys(_data).map((key: string) => {
      bodyContent.append(key, _data[key]);
    });

    console.log(bodyContent);

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

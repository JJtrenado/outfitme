import { Garment } from '../Domain/garment';

export const getGarmentByUser = async ( jwt: string, userId: string ) :Promise<Garment> => {
  try {
    const response = await fetch(
      `http://192.168.1.19:3000/garments/byUser/${userId}`,
      {
      headers: { Authorization: `Bearer ${jwt}` },
      }
    );

    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.error('Error fetching garments:', error);
  }
};

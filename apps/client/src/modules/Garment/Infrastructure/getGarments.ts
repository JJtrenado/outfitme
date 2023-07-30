// @ts-ignore
import { BACKEND_URL }from '@env';
import { Garment } from '../Domain/garment';

export const getGarmentByUser = async ( jwt: string, userId: string ) :Promise<Garment> => {
  try {
    const response = await fetch(
      `${BACKEND_URL}/garments/byUser/${userId}`,
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

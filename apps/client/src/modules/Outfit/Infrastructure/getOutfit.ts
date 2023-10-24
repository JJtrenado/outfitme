// @ts-ignore
import { BACKEND_URL }from '@env';
import { Outfit } from '../Domain/outfits';

export const getOutfitsByUser = async ( jwt: string, userId: string ) :Promise<Outfit[]> => {
  try {
    const response = await fetch(
      `${BACKEND_URL}/outfits/byUser/${userId}`,
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
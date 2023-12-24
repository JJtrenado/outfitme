// @ts-ignore
import { BACKEND_URL }from '@env';
import { Outfit } from '../Domain/outfits';
import { Garment } from '../../Garment/Domain/garment';
import { getGarmentByBarcode } from '../../Garment/Infrastructure/getGarments';

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

export const getOutfit = async (jwt: string, userId: string, index: number): Promise<{validation: string, name: string, description: string, garments: Garment[], length: number}> =>{
  try {
    const outfits: Outfit[] = await getOutfitsByUser(jwt, userId);
    const length = outfits.length;
    const validation = outfits[index].validation;
    const name = outfits[index].name;
    const description = outfits[index].description;
        
    const cabeza: Garment | null = outfits[index].cabezaBarCode !== 'undefined'
    ? await getGarmentByBarcode(jwt, outfits[index].cabezaBarCode)
    : null;

    const torso: Garment | null = outfits[index].torsoBarCode !== 'undefined'
    ? await getGarmentByBarcode(jwt, outfits[index].torsoBarCode)
    : null;

    const piernas: Garment | null = outfits[index].piernasBarCode !== 'undefined'
    ? await getGarmentByBarcode(jwt, outfits[index].piernasBarCode)
    : null;

    const pies: Garment | null = outfits[index].piesBarCode !== 'undefined'
    ? await getGarmentByBarcode(jwt, outfits[index].piesBarCode)
    : null;

    const garments: Garment[] = [cabeza, torso, piernas, pies];
    return {validation, name, description, garments, length};
    
  } catch (error) {
    console.error('Error loading outfit garments:', error);
  }
}
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
  let outfits: Outfit[] = [];
  let cabeza: Garment = null;
  let torso: Garment = null;
  let piernas: Garment = null;
  let pies: Garment = null;
  try {
    outfits = await getOutfitsByUser(jwt, userId);
    cabeza = await getGarmentByBarcode(jwt, outfits[index].cabezaBarCode);
    torso = await getGarmentByBarcode(jwt, outfits[index].torsoBarCode);
    piernas = await getGarmentByBarcode(jwt, outfits[index].piernasBarCode);
    pies = await getGarmentByBarcode(jwt, outfits[index].piesBarCode);
  } catch (error) {
    console.error('Error loading outfit garments:', error);
  }
  
  const garments: Garment[] = [cabeza, torso, piernas, pies];
  const validation = outfits[index].validation;
  const length = outfits.length;
  const name = outfits[index].name;
  console.log(outfits[index]);
  const description = outfits[index].description;

  return {validation, name, description, garments, length};
}
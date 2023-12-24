import { BACKEND_URL } from '@env';

export const deleteGarmentByBarCode = async (jwt: string, barCode: string): Promise<boolean> => {
  try {
    const garmentResponse = await fetch(
      `${BACKEND_URL}/garments/${barCode}`,
      {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${jwt}` },
      }
    );

    const outfitResponse = await fetch(
      `${BACKEND_URL}/outfits/byGarment/${barCode}`,
      {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${jwt}` },
      }
    );
    
    if (garmentResponse.ok) return true;
    return false;

  } catch (error) {
    console.error('Error deleting garment:', error);
    return false;
  }
};

import { BACKEND_URL } from '@env';

export const deleteOutfitByValidationCode = async (jwt: string, validation: string): Promise<boolean> => {
  try {
    const response = await fetch(
      `${BACKEND_URL}/outfits/${validation}`,
      {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${jwt}` },
      }
    );
    
    if (response.ok) return true;
    return false;

  } catch (error) {
    console.error('Error deleting garment:', error);
    return false;
  }
};

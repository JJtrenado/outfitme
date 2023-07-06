import * as Updates from 'expo-updates';

export const reloadApp = async () => {
  await Updates.reloadAsync();
};
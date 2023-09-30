import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useForm } from 'react-hook-form';
import StyledButton from '../atoms/StyledButton';
import PickerInput from '../atoms/listPickerInput';
import { getLocalUser } from '../../modules/common/Infrastructure/LocalStorageUser';
import { getGarmentByUser, getGarmentsByType } from '../../modules/Garment/Infrastructure/getGarments';
import { Garment } from '../../modules/Garment/Domain/garment';
import { get } from 'mongoose';

const NewOutfitForm = ({ jwt, userId }) => {
  const { control, handleSubmit, formState: { errors } } = useForm();

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [garmentsData, setGarmentsData] = useState<Garment[]>([]);

  useEffect(() => {
    const fetchUser = async () => {
      const localUser = await getLocalUser();
      setUser(localUser);
      setIsLoading(false);
      const garments = await getGarmentByUser(jwt, userId);
      setGarmentsData(garments);
    };

    fetchUser();
  }, []);

  if (isLoading) {
    return null;
  }

  const onSubmit = data => {
    data.user=user.email;
    NewOutfit (user.jwt.jwt, data);
  };

  const cabeza: Garment[] = getGarmentsByType(garmentsData, 'Cabeza');
  const torso: Garment[] = getGarmentsByType(garmentsData, 'Torso');
  const piernas: Garment[] = getGarmentsByType(garmentsData, 'Piernas');
  const pies: Garment[] = getGarmentsByType(garmentsData, 'Pies');

  return (
    <View style={styles.container}>
      <PickerInput
        name="type"
        placeholder="Parte del cuerpo"
        control={control}
        secureTextEntry={undefined}
        rules={{ required: 'Elige una parte del cuerpo' }}
        labels={cabeza.map(garment => garment.type)}
      />

      <PickerInput
        name="type"
        placeholder="Parte del cuerpo"
        control={control}
        secureTextEntry={undefined}
        rules={{ required: 'Elige una parte del cuerpo' }}
        labels={torso.map(garment => garment.type)}
      />

      <PickerInput
        name="type"
        placeholder="Parte del cuerpo"
        control={control}
        secureTextEntry={undefined}
        rules={{ required: 'Elige una parte del cuerpo' }}
        labels={piernas.map(garment => garment.type)}
      />

      <PickerInput
        name="type"
        placeholder="Parte del cuerpo"
        control={control}
        secureTextEntry={undefined}
        rules={{ required: 'Elige una parte del cuerpo' }}
        labels={pies.map(garment => garment.type)}
      />
      
      <StyledButton onPress={handleSubmit(onSubmit)}>Crear Outfit</StyledButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  }
});

export default NewOutfitForm;

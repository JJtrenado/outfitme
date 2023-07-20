import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useForm } from 'react-hook-form';
import StyledButton from '../atoms/StyledButton';
import CustomInput from '../atoms/textInput';
import PickerInput from '../atoms/listPickerInput';
import SwitchInput from '../atoms/switchInput';
import { NewGarment } from '../../modules/Garment/Infrastructure/NewGarment';
import { getLocalUser } from '../../modules/common/Infrastructure/LocalStorageUser';

const NewOutfitForm = () => {
  const { control, handleSubmit, formState: { errors } } = useForm();

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const localUser = await getLocalUser();
      setUser(localUser);
      setIsLoading(false);
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

  return (
    <View style={styles.container}>
      <PickerInput
        name="type"
        placeholder="Parte del cuerpo"
        control={control}
        secureTextEntry={undefined}
        rules={{ required: 'Elige una parte del cuerpo' }}
        labels={['Cabeza', 'Prenda 1', 'Prenda 2', 'Prenda 3']}
      />

      <PickerInput
        name="type"
        placeholder="Parte del cuerpo"
        control={control}
        secureTextEntry={undefined}
        rules={{ required: 'Elige una parte del cuerpo' }}
        labels={['Torso', 'Prenda 1', 'Prenda 2', 'Prenda 3']}
      />

      <PickerInput
        name="type"
        placeholder="Parte del cuerpo"
        control={control}
        secureTextEntry={undefined}
        rules={{ required: 'Elige una parte del cuerpo' }}
        labels={['Piernas', 'Prenda 1', 'Prenda 2', 'Prenda 3']}
      />

      <PickerInput
        name="type"
        placeholder="Parte del cuerpo"
        control={control}
        secureTextEntry={undefined}
        rules={{ required: 'Elige una parte del cuerpo' }}
        labels={['Pies', 'Prenda 1', 'Prenda 2', 'Prenda 3']}
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
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
});

export default NewOutfitForm;

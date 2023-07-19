import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useForm } from 'react-hook-form';
import StyledButton from '../atoms/StyledButton';
import CustomInput from '../atoms/textInputField';
import PickerInput from '../atoms/pickerInputField';
import SwitchInput from '../atoms/switchInputField';
import { NewGarment } from '../../modules/Garment/Infrastructure/NewGarment';
import { getLocalUser } from '../../modules/common/Infrastructure/LocalStorageUser';

const NewGarmentForm = () => {
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
    NewGarment (user.jwt.jwt, data);
  };

  return (
    <View style={styles.container}>
      <CustomInput
        name="barCode"
        placeholder="Código de barras"
        control={control}
        secureTextEntry={undefined}
      />

      <CustomInput
        name="img"
        placeholder="Imagen de la prenda"
        control={control}
        secureTextEntry={undefined}
      />

      <PickerInput
        name="type"
        placeholder="Parte del cuerpo"
        control={control}
        secureTextEntry={undefined}
        rules={{ required: 'Elige una parte del cuerpo' }}
        labels={['Cabeza', 'Torso', 'Piernas', 'Pies']}
      />

      <CustomInput
        name="brand"
        placeholder="Marca"
        control={control}
        secureTextEntry={undefined}
      />

      <CustomInput
        name="model"
        placeholder="Modelo"
        control={control}
        secureTextEntry={undefined}
      />

      <CustomInput
        name="description"
        placeholder="Descripción"
        control={control}
        secureTextEntry={undefined}
      />
      
      <SwitchInput
        name="avaliable"
        placeholder="Prenda disponible"
        control={control}
        defaultValue={true}      
      />
      
      <StyledButton onPress={handleSubmit(onSubmit)}>Crear Prenda</StyledButton>
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

export default NewGarmentForm;

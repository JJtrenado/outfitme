import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useForm } from 'react-hook-form';
import StyledButton from '../atoms/StyledButton';
import CustomInput from '../atoms/textInput';
import SwitchInput from '../atoms/switchInput';
import { NewGarment } from '../../modules/Garment/Infrastructure/NewGarment';
import { getLocalUser } from '../../modules/common/Infrastructure/LocalStorageUser';
import ButtonPickerInput from '../atoms/buttonPickerInput';

const NewGarmentForm = ({ barCode, img }) => {
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
    data.barCode=barCode;
    data.img=img;
    NewGarment (user.jwt.jwt, data);
  };

  return (
    <View style={styles.container}>
      
      <ButtonPickerInput
        name="type"
        placeholder="Parte del cuerpo"
        control={control}
        secureTextEntry={undefined}
        rules={{ required: 'Elige una parte del cuerpo' }}
        labels={['Cabeza', 'Torso', 'Piernas', 'Pies']} 
        images={[
          require('../../../assets/cap.png'),
          require('../../../assets/tshirtIcon.png'),
          require('../../../assets/pants.png'),
          require('../../../assets/shoes.png'),
        ]}
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
  }
});

export default NewGarmentForm;

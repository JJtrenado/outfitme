import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { set, useForm } from 'react-hook-form';
import StyledButton from '../atoms/StyledButton';
import CustomInput from '../atoms/textInput';
import SwitchInput from '../atoms/switchInput';
import { uploadData } from '../../modules/Garment/Infrastructure/newGarment';
import { getLocalUser } from '../../modules/common/Infrastructure/LocalStorageUser';
import ButtonPickerInput from '../atoms/buttonPickerInput';
import { useNavigation } from '@react-navigation/native';
import StyledText from '../atoms/StyledText';

const NewGarmentForm = ({ barCode, formDataPhotoUri }) => {
  const navigation = useNavigation();
  
  const { control, handleSubmit, formState: { errors } } = useForm();

  const [tipeIsSelected, setTipeIsSelected] = useState(false);

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

  const onSubmit = async data => {
    Object.keys(data).map((key: string) => {
      formDataPhotoUri.append(key, data[key]);
    });
    formDataPhotoUri.append("user" , user.email);
    formDataPhotoUri.append("barCode", barCode);
    const result = await uploadData(user.jwt.jwt, formDataPhotoUri);
    navigation.navigate('Home' as never);
    if (!result) alert("Error al crear la prenda");
  };

  return (
    <View style={styles.container}>
      { !tipeIsSelected ? (
        <View style={styles.container} onTouchEnd={() => setTipeIsSelected(true)}>
          <StyledText>Selecciona la parte del cuerpo</StyledText>
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
        </View>
      ) : (
        <><CustomInput
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
          name="available"
          placeholder="Prenda disponible"
          control={control}
          defaultValue={true}      
        />
        
        <StyledButton onPress={handleSubmit(onSubmit)}>Crear Prenda</StyledButton></>
      )}
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

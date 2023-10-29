// @ts-ignore
import { BACKEND_URL }from '@env';
import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Dimensions, Switch } from 'react-native';
import { useForm } from 'react-hook-form';
import StyledButton from '../atoms/StyledButton';
import { getLocalUser } from '../../modules/common/Infrastructure/LocalStorageUser';
import { getGarmentByUser, getGarmentsByType } from '../../modules/Garment/Infrastructure/getGarments';
import { Garment } from '../../modules/Garment/Domain/garment';
import { newOutfit } from '../../modules/Outfit/Infrastructure/newOutfit';
import StyledText from '../atoms/StyledText';
import CustomInput from '../atoms/textInput';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');



const NewOutfitForm = ({ jwt, userId }) => {
  const navigation = useNavigation();

  const [user, setUser] = useState(null);
  const [garmentsData, setGarmentsData] = useState<Garment[]>([]);

  const { control, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {
    const fetchUser = async () => {
      const localUser = await getLocalUser();
      setUser(localUser);
      const garments = await getGarmentByUser(jwt, userId);
      setGarmentsData(garments);
    };

    fetchUser();
  }, []);

  // Función para crear el estado y las fotos para un tipo de prenda
  function createGarmentStateAndPhotos(type) {
    const garments = getGarmentsByType(garmentsData, type);
    const photos = garments.map((item) => `${BACKEND_URL}/garments/${item.imagePath}`);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [availability, setAvailability] = useState(true);

    const handleAnterior = () => {
      if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      }
    };

    const handlePosterior = () => {
      if (currentIndex < photos.length - 1) {
        setCurrentIndex(currentIndex + 1);
      }
    };

    const handleAvailability = () => {
      setAvailability(!availability);
      if (availability) {
        setCurrentIndex(-1);
      }
      else{
        setCurrentIndex(0);
      }
    }

    return { garments, photos, currentIndex, availability, handleAnterior, handlePosterior, handleAvailability: handleAvailability };
  }

  // Crear estados y fotos para cada tipo de prenda
  const { garments: cabeza, photos: photosCabeza, currentIndex: currentIndexCabeza, availability: availabilityCabeza, handleAnterior: handleAnteriorCabeza, handlePosterior: handlePosteriorCabeza, handleAvailability: handleAvailabilityCabeza } = createGarmentStateAndPhotos('Cabeza');
  const { garments: torso, photos: photosTorso, currentIndex: currentIndexTorso, availability: availabilityTorso, handleAnterior: handleAnteriorTorso, handlePosterior: handlePosteriorTorso, handleAvailability: handleAvailabilityTorso } = createGarmentStateAndPhotos('Torso');
  const { garments: piernas, photos: photosPiernas, currentIndex: currentIndexPiernas, availability: availabilityPiernas, handleAnterior: handleAnteriorPiernas, handlePosterior: handlePosteriorPiernas, handleAvailability: handleAvailabilityPiernas } = createGarmentStateAndPhotos('Piernas');
  const { garments: pies, photos: photosPies, currentIndex: currentIndexPies, availability: availabilityPies, handleAnterior: handleAnteriorPies, handlePosterior: handlePosteriorPies, handleAvailability: handleAvailabilityPies } = createGarmentStateAndPhotos('Pies');

  // Función para manejar el envío de datos
  const onSubmit = data => {
    if(!availabilityCabeza && !availabilityTorso && !availabilityPiernas && !availabilityPies){
      alert("No hay prendas seleccionadas");
      return;
    }

    let validation = "";
    !availabilityCabeza ? validation = "undefined" : validation += cabeza[currentIndexCabeza].barCode;
    !availabilityTorso ? validation += "undefined" : validation += torso[currentIndexTorso].barCode;
    !availabilityPiernas ? validation += "undefined" : validation += piernas[currentIndexPiernas].barCode;
    !availabilityPies ? validation += "undefined" : validation += pies[currentIndexPies].barCode;

    const cabezaBarCode = !availabilityCabeza ? "undefined" : cabeza[currentIndexCabeza].barCode;
    const torsoBarCode = !availabilityTorso ? "undefined" : torso[currentIndexTorso].barCode;
    const piernasBarCode = !availabilityPiernas ? "undefined" : piernas[currentIndexPiernas].barCode;
    const piesBarCode = !availabilityPies ? "undefined" : pies[currentIndexPies].barCode;

    let bodyContent = JSON.stringify({
    "validation": validation,
    "cabezaBarCode": cabezaBarCode,
    "torsoBarCode": torsoBarCode,
    "piernasBarCode":piernasBarCode,
    "piesBarCode": piesBarCode,
    "user": user.email,
    "available": "true",
    "name": data.name,
    "description": data.description,
    });
    newOutfit(user.jwt.jwt, bodyContent);
    navigation.navigate('Home' as never);
  };
  
  return (
    <View style={styles.container}>
      
      <CustomInput
        name="name"
        placeholder="Nombre"
        control={control}
        secureTextEntry={undefined}
      />

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <View style={{marginRight:10}}>
          <StyledText>Cabeza</StyledText>
          <Switch value={availabilityCabeza} onValueChange={handleAvailabilityCabeza} />
        </View>
        {availabilityCabeza ?  <>
          <StyledButton onPress={handleAnteriorCabeza} children='<' ></StyledButton>
          <Image style={styles.image} source={{ uri: `${photosCabeza[currentIndexCabeza]}` }} />
          <StyledButton onPress={handlePosteriorCabeza}children='>' ></StyledButton>
        </> : null }
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <View style={{marginRight:10}}>
          <StyledText>Torso</StyledText>
          <Switch value={availabilityTorso} onValueChange={handleAvailabilityTorso} />
        </View>
        {availabilityTorso ?  <>
          <StyledButton onPress={handleAnteriorTorso} children='<' ></StyledButton>
          <Image style={styles.image} source={{ uri: `${photosTorso[currentIndexTorso]}` }} />
          <StyledButton onPress={handlePosteriorTorso}children='>' ></StyledButton>
        </> : null }
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <View style={{marginRight:10}}>
          <StyledText>Piernas</StyledText>
          <Switch value={availabilityPiernas} onValueChange={handleAvailabilityPiernas} />
        </View>
        {availabilityPiernas ?  <>
          <StyledButton onPress={handleAnteriorPiernas}children='<' ></StyledButton>
          <Image style={styles.image} source={{ uri: `${photosPiernas[currentIndexPiernas]}` }} />
          <StyledButton onPress={handlePosteriorPiernas}children='>' ></StyledButton>
        </> : null }
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <View style={{marginRight:10}}>
          <StyledText style={{margin:-10}}>Pies</StyledText>
          <Switch value={availabilityPies} onValueChange={handleAvailabilityPies} />
        </View>
        {availabilityPies ?  <>
          <StyledButton onPress={handleAnteriorPies}children='<' ></StyledButton>
          <Image style={styles.image} source={{ uri: `${photosPies[currentIndexPies]}` }} />
          <StyledButton onPress={handlePosteriorPies}children='>' ></StyledButton>
        </> : null }
      </View>


      <CustomInput
        name="description"
        placeholder="Descripción"
        control={control}
        secureTextEntry={undefined}
      />

      <StyledButton onPress={handleSubmit(onSubmit)}>Crear Outfit</StyledButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: 'center', gap: 10 },
  image: { width:width/3, height: width/3, borderRadius: 5 },
});

export default NewOutfitForm;




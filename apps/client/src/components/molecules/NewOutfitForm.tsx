// @ts-ignore
import { BACKEND_URL }from '@env';
import React, { useEffect, useState } from 'react';
import { View, ScrollView, Image, Text, StyleSheet, TouchableOpacity, Dimensions, Animated, ImageSourcePropType, Switch } from 'react-native';
import { set, useForm } from 'react-hook-form';
import StyledButton from '../atoms/StyledButton';
import PickerInput from '../atoms/listPickerInput';
import { getLocalUser } from '../../modules/common/Infrastructure/LocalStorageUser';
import { getGarmentByUser, getGarmentsByType } from '../../modules/Garment/Infrastructure/getGarments';
import { Garment } from '../../modules/Garment/Domain/garment';
import { newOutfit } from '../../modules/Outfit/Infrastructure/newOutfit';

const { width } = Dimensions.get('window');



const NewOutfitForm = ({ jwt, userId }) => {
  const [user, setUser] = useState(null);
  const [garmentsData, setGarmentsData] = useState<Garment[]>([]);

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
  const handleSubmit = () => {
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
    });
    newOutfit(user.jwt.jwt, bodyContent);
  };
  
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      
      <Text>Cabeza</Text>
      <Switch value={availabilityCabeza} onValueChange={handleAvailabilityCabeza} />
      {availabilityCabeza ? 
      <View style={{ flexDirection: 'row' }}>
        <StyledButton onPress={handleAnteriorCabeza}>Anterior</StyledButton>
        <Image style={{ width:width/2, height: width/2 }} source={{ uri: `${photosCabeza[currentIndexCabeza]}` }} />
        <StyledButton onPress={handlePosteriorCabeza}>Posterior</StyledButton>
      </View>
      : null }

      <Text>Torso</Text>
      <Switch value={availabilityTorso} onValueChange={handleAvailabilityTorso} />
      {availabilityTorso ? 
      <View style={{ flexDirection: 'row' }}>
        <StyledButton onPress={handleAnteriorTorso}>Anterior</StyledButton>
        <Image style={{ width:width/2, height: width/2 }} source={{ uri: `${photosTorso[currentIndexTorso]}` }} />
        <StyledButton onPress={handlePosteriorTorso}>Posterior</StyledButton>
      </View>
      : null }

      <Text>Piernas</Text>
      <Switch value={availabilityPiernas} onValueChange={handleAvailabilityPiernas} />
      {availabilityPiernas ?
      <View style={{ flexDirection: 'row' }}>
        <StyledButton onPress={handleAnteriorPiernas}>Anterior</StyledButton>
        <Image style={{ width:width/2, height: width/2 }} source={{ uri: `${photosPiernas[currentIndexPiernas]}` }} />
        <StyledButton onPress={handlePosteriorPiernas}>Posterior</StyledButton>
      </View>
      : null }

      <Text>Pies</Text>
      <Switch value={availabilityPies} onValueChange={handleAvailabilityPies} />
      {availabilityPies ?
      <View style={{ flexDirection: 'row' }}>
        <StyledButton onPress={handleAnteriorPies}>Anterior</StyledButton>
        <Image style={{ width:width/2, height: width/2 }} source={{ uri: `${photosPies[currentIndexPies]}` }} />
        <StyledButton onPress={handlePosteriorPies}>Posterior</StyledButton>
      </View>
      : null }

      <StyledButton onPress={() => handleSubmit(currentIndexCabeza, availabilityCabeza, currentIndexTorso, availabilityTorso, currentIndexPiernas, availabilityPiernas, currentIndexPies, availabilityPies)}>Crear Outfit</StyledButton>
    </View>
  );
};

export default NewOutfitForm;




// @ts-ignore
import { BACKEND_URL }from '@env';
import React, { useState } from 'react';
import { View, Image, StyleSheet, Dimensions, ActivityIndicator, TouchableOpacity, Modal, Platform, Switch} from 'react-native';
import StyledButton from '../atoms/StyledButton';
import { Garment } from '../../modules/Garment/Domain/garment';
import StyledText from '../atoms/StyledText';
import { useFocusEffect } from '@react-navigation/native';
import { getOutfit} from '../../modules/Outfit/Infrastructure/getOutfit';
import { deleteGarmentByBarCode } from '../../modules/Garment/Infrastructure/deleteGarment';
import { updateGarmentAvailabilityByBarCode } from '../../modules/Garment/Infrastructure/updateGarment';
import { deleteOutfitByValidationCode } from '../../modules/Outfit/Infrastructure/deleteOutfit';

const { width } = Dimensions.get('window');

const OutfitView = ({ jwt, userId }) => {
  const [loading, setLoading] = useState(true);
  const [garments, setGarments] = useState<Garment[]>([]);
  const [currentOutfit, setCurrentOutfit] = useState(0);
  const [length, setLength] = useState(0);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [validation, setValidation] = useState('');

  const [selectedGarment, setSelectedGarment] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  
  const loadGarments = async (index: number) => {
    try {
      const {validation, name, description, garments, length} = await getOutfit(jwt, userId, index);
      setValidation(validation);
      setName(name);
      setDescription(description);
      setGarments(garments);
      setLength(length);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching outfits:', error);
      setLoading(false);
    }
  }
  const handleNextOutfit = async () => {
    if (currentOutfit < length - 1) {
      setLoading(true);
      setCurrentOutfit(currentOutfit + 1);
      loadGarments(currentOutfit + 1);
    }
  }

  const handlePreviousOutfit = async () => {
    if (currentOutfit > 0) {
      setLoading(true);
      setCurrentOutfit(currentOutfit - 1);
      loadGarments(currentOutfit - 1);
    }
  }

  const handleDeleteOutfit = async () => {
    await deleteOutfitByValidationCode(jwt, validation);
    if (currentOutfit > 0) {
      setLoading(true);
      loadGarments(currentOutfit - 1);
    }else{
    loadGarments(0);
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      loadGarments(0);
      setCurrentOutfit(0);
    }, [])
  );

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  const garmentTypeImages = {
    Cabeza: require('../../../assets/cap.png'),
    Torso: require('../../../assets/tshirtIcon.png'),
    Piernas: require('../../../assets/pants.png'),
    Pies: require('../../../assets/shoes.png'),
  };

  return (
    <View style={styles.container}>
      <View style={styles.columnas}>
        <View style={styles.columnaIzquierda}>
          <StyledText fontSize='title' fontWeight='bold'>{name}</StyledText>
          <StyledText>{description}</StyledText>
        </View>
        
        <View style={styles.columnaDerecha}>
          {garments.map((garment, index) => (
            garment ? (
              <View key={index} style={styles.imageContainer}>

                <TouchableOpacity onPress={() => {
                  setSelectedGarment(garment);
                  setIsModalVisible(true);
                }}>
                  <Image source={{ uri: `${BACKEND_URL}/garments/${garment.imagePath}` }} style={[styles.image, garment.available === false ? { borderColor: '#EA0C5F' } : null]} />
                  
                </TouchableOpacity>
                <Image style={{ width: 30, height: 30, resizeMode: 'contain' }} source={garmentTypeImages[garment.type]} />
              </View>
            ) : null
          ))}
        </View>

      </View>
      <View style={styles.buttonsContainer}>
        <StyledButton style={styles.button} onPress={handlePreviousOutfit} children='Anterior' />
        <StyledButton style={styles.button} color='red' onPress={handleDeleteOutfit}>Eliminar</StyledButton>
        <StyledButton style={styles.button} onPress={handleNextOutfit} children='Siguiente' />
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={[styles.modalContainer, Platform.OS === 'android' ? styles.androidShadow : styles.iosShadow]}>
          {selectedGarment && (
            <View>
              <Image
                source={{ uri: `${BACKEND_URL}/garments/${selectedGarment.imagePath}` }}
                style={styles.detailImage} />
              <StyledText>Código: {selectedGarment.barCode}</StyledText>
              <StyledText>Parte del cuerpo: {selectedGarment.type}</StyledText>
              <StyledText>Marca: {selectedGarment.brand}</StyledText>
              <StyledText>Modelo: {selectedGarment.model}</StyledText>
              <StyledText>Descripción: {selectedGarment.description}</StyledText>
              <View style={styles.modalButtonsContainer}>
                <StyledButton color='red' onPress={async () => {
                  await deleteGarmentByBarCode(jwt, selectedGarment.barCode);
                  setIsModalVisible(false);
                  loadGarments(0);
                } }>
                  Eliminar
                </StyledButton>
                <View>
                  <StyledText fontWeight='bold'>Estado:</StyledText>
                  <Switch value={selectedGarment.available} onValueChange={async () => {
                    setIsModalVisible(false);
                    await updateGarmentAvailabilityByBarCode(jwt, selectedGarment.barCode, selectedGarment.available);
                    loadGarments(0);
                  } } />
                </View>
                <StyledButton onPress={() => setIsModalVisible(false)}>Cerrar</StyledButton>
              </View>
            </View>

          )}
        </View>
      </Modal>

    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 10, flex: 1, justifyContent: 'space-between' },
  columnas: { flexDirection: 'row', justifyContent: 'space-around', width: '100%'},
  columnaIzquierda: { width: '55%' },
  columnaDerecha: { width: '45%', alignItems: 'center', gap: 3 },

  imageContainer: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  image: { width:width/3, height: width/3, borderColor: 'white', borderWidth: 5, borderRadius: 5, },
  
  buttonsContainer: { flexDirection: 'row', width: '100%', justifyContent: 'space-between'},
  button: {
    padding: 15,
  },
  modalContainer: {
    marginTop: '30%',
    justifySelf: 'center',
    alignSelf: 'center',
    padding: 5,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  androidShadow: {
    elevation: 5,
  },
  iosShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flatListContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  detailImage: { 
    width: 300,
    height: 300,
    resizeMode: 'cover',
    marginBottom: 5,
    borderRadius: 5,
  },
});

export default OutfitView;

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
import GarmentDetailsModal from '../organisms/DetailGarmentModal';
import DeleteButton from '../atoms/DeleteButton';
import PreviousButton from '../atoms/PreviousButton';
import NextButton from '../atoms/NextButton';

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
      setCurrentOutfit(currentOutfit - 1);
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
  const garmentTypeImagesNumber = {
    0: require('../../../assets/cap.png'),
    1: require('../../../assets/tshirtIcon.png'),
    2: require('../../../assets/pants.png'),
    3: require('../../../assets/shoes.png'),
  };

  return (
    <View style={styles.container}>
      <StyledText style={styles.title}fontSize='title' fontWeight='bold' color='white'>{name}</StyledText>
      <View style={styles.columns}>
          <View style={styles.circle}></View>
        <View style={styles.leftColumn}>
          {garments.map((garment, index) => (
            garment ? (
              <View key={index} style={styles.imageContainer}>
                <TouchableOpacity onPress={() => {
                  setSelectedGarment(garment);
                  setIsModalVisible(true);
                }}>
                  <Image source={{ uri: `${BACKEND_URL}/garments/${garment.imagePath}` }} style={[styles.image, garment.available === false ? { borderColor: '#EA0C5F' } : null]} />
                </TouchableOpacity>
              </View>
            ) : 
            (<Image style={styles.noGarmentImage} source={garmentTypeImagesNumber[index]} />)
            ))}
        </View>
        <View style={styles.rightColumn}>
          <StyledText>{description}</StyledText>
        </View>
      </View>
      <View style={styles.buttonsContainer}>
        <PreviousButton onPress={handlePreviousOutfit} />
        <DeleteButton color='white' onPress={handleDeleteOutfit}/>
        <NextButton onPress={handleNextOutfit} />
      </View>

      <GarmentDetailsModal
        garment={selectedGarment}
        jwt={jwt}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        reload={() => loadGarments(currentOutfit)}
        reloadOnDelete={() => loadGarments(currentOutfit - 1)}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  circle: {
    position: 'absolute',
    width: 1000,
    height: 1000,
    bottom: -700,
    right: -700,
    borderRadius: 500,
    backgroundColor: 'aquamarine',
  },
  container: { 
    flex: 1,
    justifyContent: 'space-between',
    padding: 10,
  },
  title: {
    backgroundColor: '#24292e',
    textAlign: 'center',
    borderRadius: 5,
    padding: 10,
    elevation: 5,
  },
  columns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: 'white',
    gap: 5,
    padding: 5,
    borderRadius: 5,
    elevation: 5,
  },
  rightColumn: { flex:1, padding: 3},
  leftColumn: { gap: 2 },
  imageContainer: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  image: { width:width/3, height: width/3, borderColor: 'white', borderWidth: 3, borderRadius: 5 },
  noGarmentImage: {margin: 50, width: 30, height: 30, resizeMode: 'contain' },
  
  buttonsContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#24292e',
    borderRadius: 5,
    padding: 15,
    elevation: 5,
  },
});

export default OutfitView;

// @ts-ignore
import { BACKEND_URL }from '@env';
import React, { useState } from 'react';
import { View, Image, StyleSheet, Dimensions, ActivityIndicator} from 'react-native';
import StyledButton from '../atoms/StyledButton';
import { Garment } from '../../modules/Garment/Domain/garment';
import StyledText from '../atoms/StyledText';
import { useFocusEffect } from '@react-navigation/native';
import { getOutfit} from '../../modules/Outfit/Infrastructure/getOutfit';

const { width } = Dimensions.get('window');

const OutfitView = ({ jwt, userId }) => {
  const [loading, setLoading] = useState(true);
  const [garments, setGarments] = useState<Garment[]>([]);
  const [currentOutfit, setCurrentOutfit] = useState(0);
  const [length, setLength] = useState(0);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  
  const loadGarments = async (index: number) => {
    try {
      const {name, description, garments, length} = await getOutfit(jwt, userId, index);
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


  
  return (
    <View style={styles.container}>
      <StyledText fontSize='title' fontWeight='bold' >{name}</StyledText>
      <View style={styles.imageContainer}>
        {garments[0] ?  <>
          <Image style={styles.image} source={{ uri: `${BACKEND_URL}/garments/${garments[0].imagePath}` }} />
        </> : null }
        {garments[1] ?  <>
          <Image style={styles.image} source={{ uri: `${BACKEND_URL}/garments/${garments[1].imagePath}` }} />
        </> : null }
        {garments[2] ?  <>
          <Image style={styles.image} source={{ uri: `${BACKEND_URL}/garments/${garments[2].imagePath}` }} />
        </> : null }
        {garments[3] ?  <>
          <Image style={styles.image} source={{ uri: `${BACKEND_URL}/garments/${garments[3].imagePath}` }} />
        </> : null }
      </View>

      <StyledText>{description}</StyledText>
      
      <View style={styles.buttonsContainer}>
        <StyledButton onPress={handlePreviousOutfit} children=' < ' />
        <StyledButton onPress={handleNextOutfit} children=' > ' />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, marginBottom: 20, alignItems: 'center', gap: 10, justifyContent: 'space-between'},
  imageContainer: { gap: 10 },
  image: { width:width/3, height: width/3, borderRadius: 5 },
  buttonsContainer: { flexDirection: 'row', width: '100%', justifyContent: 'space-around' },
});

export default OutfitView;

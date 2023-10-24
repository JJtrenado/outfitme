// @ts-ignore
import { BACKEND_URL }from '@env';
import React, { useEffect, useState } from 'react';
import { View, ScrollView, Image, Text, StyleSheet, TouchableOpacity, Dimensions, Animated, ImageSourcePropType, Switch, ActivityIndicator, Modal, Platform, FlatList } from 'react-native';
import { set, useForm } from 'react-hook-form';
import StyledButton from '../atoms/StyledButton';
import PickerInput from '../atoms/listPickerInput';
import { getLocalUser } from '../../modules/common/Infrastructure/LocalStorageUser';
import { getGarmentByBarcode, getGarmentByUser, getGarmentsByType } from '../../modules/Garment/Infrastructure/getGarments';
import { Garment } from '../../modules/Garment/Domain/garment';
import { newOutfit } from '../../modules/Outfit/Infrastructure/newOutfit';
import StyledText from '../atoms/StyledText';
import CustomInput from '../atoms/textInput';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { updateGarmentAvailabilityByBarCode } from '../../modules/Garment/Infrastructure/updateGarment';
import { deleteGarmentByBarCode } from '../../modules/Garment/Infrastructure/deleteGarment';
import { getOutfitsByUser } from '../../modules/Outfit/Infrastructure/getOutfit';
import { Outfit } from '../../modules/Outfit/Domain/outfits';

const { width } = Dimensions.get('window');



const OutfitView = ({ jwt, userId }) => {
  const [outfitsData, setOutfitsData] = useState<Outfit[]>([]);
  const [loading, setLoading] = useState(true);
  const [garmentsData, setGarmentsData] = useState<Garment[]>([]);

  const loadOutfits = async () => {
    try {
      const outfits = await getOutfitsByUser(jwt, userId);
      setOutfitsData(outfits);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching garments:', error);
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadOutfits();
    }, [])
  );

  console.log('outfitsData', outfitsData);



  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" />
        <Text>Loading...</Text>
      </View>
    );
  }

  const windowWidth = Dimensions.get('window').width;
  const imageWidth = windowWidth / 3;

  return (
    <View>
      <FlatList
        data={outfitsData}
        numColumns={3}
        renderItem={({ item }) => (
          <StyledText>{item.name}</StyledText>
        )}
        keyExtractor={(item) => item.validation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  itemImage: {
    aspectRatio: 1,
    resizeMode: 'cover',
    borderColor: 'white',
    borderWidth: 5,
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
  buttonsContainer: {
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

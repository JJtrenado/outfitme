// @ts-ignore
import { BACKEND_URL }from '@env';
import React, { useState } from 'react';
import { View, ActivityIndicator, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native';
import { getGarmentByUser } from '../../modules/Garment/Infrastructure/getGarments';
import { Garment } from '../../modules/Garment/Domain/garment';
import { StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import GarmentDetailsModal from '../organisms/DetailGarmentModal';
import theme from '../theme';

const GarmentListSimple = ({ jwt, userId }) => {
  const [garmentsData, setGarmentsData] = useState<Garment[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGarment, setSelectedGarment] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);


  const loadGarments = async () => {
    try {
      setGarmentsData(await getGarmentByUser(jwt, userId));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching garments:', error);
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadGarments();
    }, [])
  );
  
  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const windowWidth = Dimensions.get('window').width;
  const imageWidth = windowWidth / 3 - 10;

  return (
    <View style={styles.container}>
      <FlatList
        data={garmentsData}
        numColumns={3}
        contentContainerStyle={styles.flatListContent}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => {
            setSelectedGarment(item);
            setIsModalVisible(true);
          }}>
            <Image
              source={{ uri: `${BACKEND_URL}/garments/${item.imagePath}` }}
              style={[styles.itemImage, { width: imageWidth }, item.available === false ? { borderColor: theme.colors.accent } : null]}
            />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.barCode}
      />

      <GarmentDetailsModal
        garment={selectedGarment}
        jwt={jwt}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        goToPage='Garment'
        reload={loadGarments}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10, 
  },
  itemImage: {
    margin: 2,
    aspectRatio: 1,
    resizeMode: 'cover',
    borderColor: 'white',
    borderWidth: 3,
    borderRadius: 5,
  },
  flatListContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
});

export default GarmentListSimple;


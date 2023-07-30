import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, FlatList, Image, Modal, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { getGarmentByUser } from '../../modules/Garment/Infrastructure/getGarments';
import { Garment } from '../../modules/Garment/Domain/garment';
import { StyleSheet } from 'react-native';
import StyledText from '../atoms/StyledText';
import StyledButton from '../atoms/StyledButton';
import e from 'express';


const GarmentListSimple = ({ jwt, userId }) => {
  const [garmentsData, setGarmentsData] = useState<Garment[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGarment, setSelectedGarment] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const garments = await getGarmentByUser(jwt, userId);
        setGarmentsData(garments);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching garments:', error);
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  console.log('garmentsData', garmentsData);

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
        data={garmentsData}
        numColumns={3}
        contentContainerStyle={styles.flatListContent}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => {
            setSelectedGarment(item);
            setIsModalVisible(true);
          }}>
            <Image
              source={{ uri: `http://192.168.1.19:3000/garments/${item.imagePath}` }}
              style={[styles.itemImage, { width: imageWidth }]}
            />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.barCode}
      />

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
              source={{ uri: `http://192.168.1.19:3000/garments/${selectedGarment.imagePath}` }}
              style={styles.detailImage}
              />
              <StyledText>Código: {selectedGarment.barCode}</StyledText>
              <StyledText>Parte del cuerpo: {selectedGarment.type}</StyledText>
              <StyledText>Marca: {selectedGarment.brand}</StyledText>
              <StyledText>Modelo: {selectedGarment.model}</StyledText>
              <StyledText>Descripción: {selectedGarment.description}</StyledText>
              <StyledText>Disponible: {selectedGarment.available ? 'Yes' : 'No'}</StyledText>
              <StyledButton style={styles.closeButton} onPress={() => setIsModalVisible(false)} >Cerrar</StyledButton>
           </View>
          )}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  itemImage: {
    aspectRatio: 1, // Aspecto 1:1 para hacer que la imagen sea cuadrada
    resizeMode: 'cover',
    borderColor: 'white',
    borderWidth: 5,
  },
  modalContainer: {
    marginTop: '50%',
    justifySelf: 'center',
    alignSelf: 'center',
    padding: 5,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  androidShadow: {
    elevation: 5, // Sombras en dispositivos Android
  },
  iosShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // Sombras en dispositivos iOS
  },
  closeButton: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: 0,
    right: 0,  
  },
  flatListContent: {
    flexGrow: 1, // Permite que el contenido de FlatList ocupe todo el espacio
    justifyContent: 'space-between', // Espaciado entre elementos en la cuadrícula
  },
  detailImage: { 
    width: 300,
    height: 300,
    resizeMode: 'cover',
    marginBottom: 5,
    borderRadius: 5,
  },
});

export default GarmentListSimple;


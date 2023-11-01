// @ts-ignore
import { BACKEND_URL }from '@env';
import React, { useState } from 'react';
import { View, ActivityIndicator, FlatList, Image, Modal, TouchableOpacity, Dimensions, Platform, Switch, Alert } from 'react-native';
import { getGarmentByUser } from '../../modules/Garment/Infrastructure/getGarments';
import { Garment } from '../../modules/Garment/Domain/garment';
import { StyleSheet } from 'react-native';
import StyledText from '../atoms/StyledText';
import StyledButton from '../atoms/StyledButton';
import { deleteGarmentByBarCode } from '../../modules/Garment/Infrastructure/deleteGarment';
import { updateGarmentAvailabilityByBarCode } from '../../modules/Garment/Infrastructure/updateGarment';
import { useFocusEffect } from '@react-navigation/native';
import { AlertDeleteGarment } from './AlertDeleteGarment';


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
              style={[styles.itemImage, { width: imageWidth }, item.available === false ? { borderColor: '#EA0C5F' } : null]}
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
              source={{ uri: `${BACKEND_URL}/garments/${selectedGarment.imagePath}` }}
              style={styles.detailImage}
              />
              <StyledText>Código: {selectedGarment.barCode}</StyledText>
              <StyledText>Parte del cuerpo: {selectedGarment.type}</StyledText>
              <StyledText>Marca: {selectedGarment.brand}</StyledText>
              <StyledText>Modelo: {selectedGarment.model}</StyledText>
              <StyledText>Descripción: {selectedGarment.description}</StyledText>
              <View style={styles.buttonsContainer}>
              <StyledButton color='red' onPress={async () => {
                Alert.alert(
                  "Eliminar prenda",
                  "Si eliminas esta prenda se eliminarán los outfits asociados a ella. ¿Estás seguro que deseas eliminar esta prenda?",
                  [{
                    text: "Cancelar",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                  },{
                    text: "Eliminar",
                    onPress: async () => {
                      await deleteGarmentByBarCode(jwt, selectedGarment.barCode);
                      loadGarments();
                    }
                  }]
                )
                setIsModalVisible(false);
              }}>
                Eliminar
              </StyledButton>
              <View>
                <StyledText fontWeight='bold'>Estado:</StyledText>
                <Switch value={selectedGarment.available} onValueChange={async () => {
                  setIsModalVisible(false);
                  await updateGarmentAvailabilityByBarCode(jwt, selectedGarment.barCode, selectedGarment.available);
                  loadGarments();
                }}/>
              </View>
              <StyledButton onPress={() => setIsModalVisible(false)} >Cerrar</StyledButton>
              </View>
           </View>
          )}
        </View>
      </Modal>
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
    borderWidth: 5,
    borderRadius: 5,
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

export default GarmentListSimple;


// @ts-ignore
import { BACKEND_URL }from '@env';
import React from 'react';
import { Modal, Image, Switch, Alert, View, Platform, StyleSheet } from 'react-native';
import StyledText from '../atoms/StyledText';
import StyledButton from '../atoms/StyledButton';
import { deleteGarmentByBarCode } from '../../modules/Garment/Infrastructure/deleteGarment';
import { updateGarmentAvailabilityByBarCode } from '../../modules/Garment/Infrastructure/updateGarment';
import { useNavigation } from '@react-navigation/native';
import { Garment } from '../../modules/Garment/Domain/garment';



interface GarmentDetailsModalProps {
  garment: Garment;
  jwt: string;
  isModalVisible: boolean;
  setIsModalVisible: (isVisible: boolean) => void;
  goToPage?: string;
  reload?: Function;
}

const GarmentDetailsModal = ({ garment, jwt, isModalVisible, setIsModalVisible, goToPage, reload }: GarmentDetailsModalProps) => {
  const navigation = useNavigation();

  function handleClose(): void {
    setIsModalVisible(false);
    if (goToPage) navigation.navigate(goToPage as never);
  }

  return (
    <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={[styles.modalContainer, Platform.OS === 'android' ? styles.androidShadow : styles.iosShadow]}>
          {garment && (
            <View>
              <Image
              source={{ uri: `${BACKEND_URL}/garments/${garment.imagePath}` }}
              style={styles.detailImage}
              />
              <StyledText>Código: {garment.barCode}</StyledText>
              <StyledText>Parte del cuerpo: {garment.type}</StyledText>
              <StyledText>Marca: {garment.brand}</StyledText>
              <StyledText>Modelo: {garment.model}</StyledText>
              <StyledText>Descripción: {garment.description}</StyledText>
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
                      await deleteGarmentByBarCode(jwt, garment.barCode);
                      if (goToPage) navigation.navigate(goToPage as never);
                      if (reload) reload();
                    }
                  }]
                )
                setIsModalVisible(false);
              }}>
                Eliminar
              </StyledButton>
              <View>
                <StyledText fontWeight='bold'>Estado:</StyledText>
                <Switch value={garment.available} onValueChange={async () => {
                  setIsModalVisible(false);
                  await updateGarmentAvailabilityByBarCode(jwt, garment.barCode, garment.available);
                  if (goToPage) navigation.navigate(goToPage as never);
                  if (reload) reload();
                }}/>
              </View>
              <StyledButton onPress={() => handleClose()} >Cerrar</StyledButton>
              </View>
           </View>
          )}
        </View>
      </Modal>
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

export default GarmentDetailsModal;

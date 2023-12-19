// @ts-ignore
import { BACKEND_URL }from '@env';
import React from 'react';
import { Modal, Image, Switch, Alert, View, Platform, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import StyledText from '../atoms/StyledText';
import StyledButton from '../atoms/StyledButton';
import { deleteGarmentByBarCode } from '../../modules/Garment/Infrastructure/deleteGarment';
import { updateGarmentAvailabilityByBarCode } from '../../modules/Garment/Infrastructure/updateGarment';
import { useNavigation } from '@react-navigation/native';
import { Garment } from '../../modules/Garment/Domain/garment';
import BarCodeButton from '../atoms/BarCodeButton';
import OutfitButton from '../atoms/OutfitButton';
import StyledImageButton from '../atoms/StyledImageButton';
import DeleteButton from '../atoms/DeleteButton';
import theme from '../theme';



interface GarmentDetailsModalProps {
  garment: Garment;
  jwt: string;
  isModalVisible: boolean;
  setIsModalVisible: (isVisible: boolean) => void;
  goToPage?: string;
  reload?: Function;
  reloadOnDelete?: Function;
}

const GarmentDetailsModal = ({ garment, jwt, isModalVisible, setIsModalVisible, goToPage, reload, reloadOnDelete }: GarmentDetailsModalProps) => {
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
        <TouchableWithoutFeedback style={{flex: 1}} onPressOut={() => setIsModalVisible(false)}>
        <View style={[styles.modalContainer, Platform.OS === 'android' ? styles.androidShadow : styles.iosShadow]}>
          {garment && (
            <View>
              <View style={styles.title}>
                <StyledText fontSize='title' fontWeight='bold' style={{width: 213}}>{garment.model}</StyledText>
                <View style={styles.row}>
                  <DeleteButton onPress={async () => {
                    Alert.alert("Eliminar prenda","Si eliminas esta prenda se eliminarán los outfits asociados a ella. ¿Estás seguro que deseas eliminar esta prenda?",
                    [{
                      text: "Cancelar",
                      onPress: () => console.log("Cancel Pressed"),
                      style: "cancel"
                    },{
                      text: "Eliminar",
                      onPress: async () => {
                        await deleteGarmentByBarCode(jwt, garment.barCode);
                        if (goToPage) navigation.navigate(goToPage as never);
                        if (reloadOnDelete) reloadOnDelete();
                        else if (reload) reload();
                      }
                    }]
                    )
                    setIsModalVisible(false);
                  }}/>
                  <Switch
                    trackColor={{false: '#767577', true: '#5b20bd'}}
                    thumbColor={theme.colors.accent}
                    value={garment.available}
                    onValueChange={async () => {
                      setIsModalVisible(false);
                      await updateGarmentAvailabilityByBarCode(jwt, garment.barCode, garment.available);
                      if (goToPage) navigation.navigate(goToPage as never);
                      if (reload) reload();
                    }}
                  />
                </View>
              </View>
              <View style={styles.topInfo}>
                <View style={styles.column}>
                  <BarCodeButton size={20}/>
                  <StyledText>{garment.barCode}</StyledText>
                </View>
                <View style={styles.column}>
                  <OutfitButton size={20}/>
                  <StyledText>{garment.type}</StyledText>
                </View>
                <View style={styles.column}>
                  <StyledImageButton imageSource={require("../../../assets/label.png")} size={19}/>
                  <StyledText>{garment.brand}</StyledText>
                </View>
              </View>
                <Image
                source={{ uri: `${BACKEND_URL}/garments/${garment.imagePath}` }}
                style={styles.detailImage}
                />
              <StyledText style={styles.description}>{garment.description}</StyledText>
                    
              <View style={styles.buttonsContainer}>
              
              
              </View>
              <StyledButton fontSize='title' style={styles.closeButton} onPress={() => handleClose()} >X</StyledButton>
           </View>
          )}
        </View>
        </TouchableWithoutFeedback>
      </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    marginTop: '30%',
    justifySelf: 'center',
    alignSelf: 'center',
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  title: {
    flexDirection: 'row',
    width: 300,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  topInfo: {
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    paddingVertical: 8,
  },
  column: {
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    gap: -5,
  },
  detailImage: { 
    width: 300,
    height: 300,
    resizeMode: 'cover',
    borderRadius: 5,
  },
  description: {
    marginTop: 10,
    width: 300,
    padding: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  closeButton: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: -50,
    width: 60,
    height: 60,
    borderRadius: 50,
    justifyContent: 'center',
    elevation: 5,
    backgroundColor: theme.colors.primary,
  },
});

export default GarmentDetailsModal;

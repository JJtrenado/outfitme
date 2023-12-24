// @ts-ignore
import { BACKEND_URL }from '@env';
import React, { useEffect } from "react";
import { Modal, Platform, StyleSheet, Switch, View, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getLocalUser } from '../../modules/common/Infrastructure/LocalStorageUser';
import { useState } from "react";
import Header from "../molecules/Header";
import StyledText from "../atoms/StyledText";
import MyBarCodeScanner from "../molecules/BarCodeScanner";
import { getGarmentByBarcode } from "../../modules/Garment/Infrastructure/getGarments";
import StyledButton from '../atoms/StyledButton';
import { deleteGarmentByBarCode } from '../../modules/Garment/Infrastructure/deleteGarment';
import { updateGarmentAvailabilityByBarCode } from '../../modules/Garment/Infrastructure/updateGarment';
import { Garment } from '../../modules/Garment/Domain/garment';
import GarmentDetailsModal from '../organisms/DetailGarmentModal';


const ScannScreen = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [barCode, setBarCode] = useState(null);
  const [garment, setGarment] = useState<Garment>(null);
  const [isModalVisible, setIsModalVisible] = useState(true);


  useEffect(() => {
    const fetchUser = async () => {
      const localUser = await getLocalUser();
      setUser(localUser);
      setIsLoading(false);
    };

    fetchUser();
  }, []);

  const handleScanSuccess = async (data) => {
    try{
      setBarCode(data);
      const result = await getGarmentByBarcode(user.jwt.jwt, data);
      if (result) setGarment(result);
      else {
        navigation.navigate('Home' as never);
        alert("Error al obtener la prenda");
      }
    }catch(error){
      console.error(garment);
    }
  };

  if (isLoading) {
    return null;
  }

  return (
    <>
      <Header picture={user.picture}/>

    {barCode == null ? (
      <>
        <StyledText align='center' fontWeight='bold' style={{marginTop: 20}}>Escanea el código de la prenda</StyledText>
      <MyBarCodeScanner onScanSuccess={handleScanSuccess} />
      </>
    ) : (
      <GarmentDetailsModal
        garment={garment}
        jwt={user.jwt.jwt}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        goToPage={'Home'}
      />
    )}

      
    </>
  );
}

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

export default ScannScreen;

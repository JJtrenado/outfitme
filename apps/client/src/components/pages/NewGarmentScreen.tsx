import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getLocalUser } from '../../modules/common/Infrastructure/LocalStorageUser';
import Header from "../molecules/Header";
import StyledText from "../atoms/StyledText";
import NewGarmentForm from "../molecules/NewGarmentForm";
import MyBarCodeScanner from "../molecules/BarCodeScanner";
import CameraComponent from "../molecules/CameraComponent";
import ImagePickerExample from "../molecules/ImagePicker";

const NewGarmentScreen = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [barCode, setBarCode] = useState(null);
  const [img, setImg] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const localUser = await getLocalUser();
      setUser(localUser);
      setIsLoading(false);
    };
    
    fetchUser();
  }, []);

  const handleScanSuccess = (data) => {
    setBarCode(data);
  };

  const handlePhotoTaken = (photoUri) => {
    setImg(photoUri);
    console.log(photoUri);
  };

  if (isLoading) {
    return null;
  }

  if (!user) {
    navigation.navigate('Login' as never);
    return null;
  }

  return (
    <>
      <Header picture={user.picture} />
      {barCode == null ? (
        <>
          <StyledText align='center' fontSize="title" fontWeight='bold' style={{marginTop: 20}}>Escanea el código de la prenda</StyledText>
          <MyBarCodeScanner onScanSuccess={handleScanSuccess} />
        </>
      ) : img == null ? (
        <>
          <StyledText align='center' fontSize="title" fontWeight='bold' style={{marginTop: 20}}>Haz una foto a la prenda</StyledText>
          {/* <CameraComponent onImgSuccess={handlePhotoTaken} /> */}
          <ImagePickerExample onPickerSuccess={handlePhotoTaken}/>

        </>
      ) : (
        <ScrollView>
          <StyledText align="center" fontSize="title" fontWeight="bold" style={{marginTop: 20}}>Nueva Prenda</StyledText>
          <NewGarmentForm barCode={barCode} img={img} />
        </ScrollView>
      )}
    </>
  );
}

export default NewGarmentScreen;

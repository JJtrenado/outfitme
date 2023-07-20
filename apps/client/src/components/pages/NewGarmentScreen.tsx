import React, { useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getLocalUser } from '../../modules/common/Infrastructure/LocalStorageUser';
import { useState } from "react";
import Header from "../molecules/Header";
import StyledText from "../atoms/StyledText";
import NewGarmentForm from "../molecules/NewGarmentForm";
import MyBarCodeScanner from "../molecules/BarCodeScanner";

const NewGarmentScreen = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [barCode, setBarCode] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const localUser = await getLocalUser();
      setUser(localUser);
      setIsLoading(false);
    };

    fetchUser();
  }, []);

  if (isLoading) {
    return null;
  }

  if (!user) {
    navigation.navigate('Login' as never);
    return null;
  }

  const handleScanSuccess = (data) => {
    setBarCode(data);
  };

  if (barCode==null) {
    return (
      <>
        <Header picture={user.picture}/>
        <StyledText align='center' fontWeight='bold' style={{marginTop: 20}}>Escanea el código de la prenda</StyledText>
        <MyBarCodeScanner jwt={user.jwt.jwt} onScanSuccess={handleScanSuccess} />
      </>
    );
  }

  return (
    <ScrollView>
      <Header picture={user.picture} />
      <StyledText align="center" fontWeight="bold" style={{marginTop: 20}}>Nueva Prenda</StyledText>
      <NewGarmentForm barCode={barCode}/>
    </ScrollView>
  );
}

export default NewGarmentScreen;
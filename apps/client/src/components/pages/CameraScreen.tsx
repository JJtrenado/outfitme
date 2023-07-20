import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getLocalUser } from '../../modules/common/Infrastructure/LocalStorageUser';
import { useState } from "react";
import Header from "../molecules/Header";
import StyledText from "../atoms/StyledText";
import MyBarCodeScanner from "../molecules/BarCodeScanner";
import CameraComponent from "../molecules/CameraComponent";


const CamaraScreen = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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

  return (
    <>
      <Header picture={user.picture}/>
      <StyledText align='center' fontWeight='bold' style={{marginTop: 20}}>Haz una foto a la prenda</StyledText>
      <CameraComponent />
    </>
  );
}

export default CamaraScreen;

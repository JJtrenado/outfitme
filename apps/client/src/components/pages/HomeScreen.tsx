import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getLocalUser } from '../../modules/common/Infrastructure/LocalStorageUser';
import { useState } from "react";
import Header from "../molecules/Header";
import StyledText from "../atoms/StyledText";
import BarCodeButton from "../atoms/BarCodeButton";
import OutfitButton from "../atoms/OutfitButton";
import StyledImageButton from "../atoms/StyledImageButton";


const HomeScreen = () => {
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

  if (!user) {
    navigation.navigate('Login' as never);
    return null;
  }

  return (
    <View>
      <Header picture={user.picture} />
      <View style={[styles.buttons]}>
        <BarCodeButton onPress={() => {navigation.navigate('Scann' as never);}} size={40}/>
        <StyledImageButton onPress={() => { navigation.navigate('Scann' as never); }} imageSource={require("../../../assets/tshirtIcon.png")} size={45}/>
        <OutfitButton onPress={() => {navigation.navigate('Scann' as never);}} size={40}/>
      </View>
      <StyledText align='center' fontWeight='bold'>Hola {user.name}!</StyledText>
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({  
  buttons: {
    justifyContent: "space-around",
    flexDirection: "row",
    marginVertical: 20,
    alignItems: "center",
  },
});
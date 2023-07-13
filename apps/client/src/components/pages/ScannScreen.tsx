import React, { useEffect } from "react";
import { StyleSheet, Image, View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getLocalUser } from '../../modules/common/Infrastructure/LocalStorageUser';
import { useState } from "react";
import Header from "../molecules/Header";
import StyledText from "../atoms/StyledText";
import MyBarCodeScanner from "../atoms/BarCodeScanner";

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

  return (
    <>
    <Header picture={user.picture} />
    <View style={[styles.card]}>
      <StyledText align='center' fontWeight='bold'>Escanea lo que quieras</StyledText>
    </View>
    <MyBarCodeScanner jwt={user.jwt.jwt}/>
    </>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({  
  card: {
    marginTop: 50,
  },
});
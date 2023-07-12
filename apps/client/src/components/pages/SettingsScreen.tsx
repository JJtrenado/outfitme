import React, { useEffect } from "react";
import { StyleSheet, Image, View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getLocalUser, removeLocalUser } from '../../modules/common/Infrastructure/LocalStorageUser';
import { useState } from "react";
import { reloadApp } from "../../modules/common/Application/ReloadApp";
import Header from "../molecules/Header";
import StyledText from "../atoms/StyledText";
import StyledButton from "../atoms/StyledButton";
import { logOut } from "../../modules/Login/Infrastructure/logOut";

const SettingsScreen = () => {
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
    <View>
      <Header picture={user.picture} />

      <View style={styles.container}>
        <View style={styles.user}>
          <Image source={{ uri: user?.picture }} style={styles.image} />
          <StyledText align='center' fontWeight='bold'>{user.name}</StyledText>
          <StyledText align='center'>{user.email}</StyledText>
        </View>
        <StyledButton onPress={() => {logOut();}}>Cerrar sesión</StyledButton>
      </View>
    </View>
  );
}

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignItems: "center",
    gap: 10,
  },
  user: {
    gap: 5,
  },
  image: {
    alignSelf: "center",
    width: 80,
    height: 80,
    borderRadius: 50,
  },
});
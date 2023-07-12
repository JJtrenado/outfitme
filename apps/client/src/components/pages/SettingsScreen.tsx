import React, { useEffect } from "react";
import { StyleSheet, Image, View} from "react-native";
import { getLocalUser } from '../../modules/common/Infrastructure/LocalStorageUser';
import { useState } from "react";
import Header from "../molecules/Header";
import StyledText from "../atoms/StyledText";
import StyledButton from "../atoms/StyledButton";
import { logOut } from "../../modules/Login/Infrastructure/logOut";

const SettingsScreen = () => {
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
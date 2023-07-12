import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getLocalUser } from '../../modules/common/Infrastructure/LocalStorageUser';
import { useState } from "react";
import Header from "../molecules/Header";
import StyledText from "../atoms/StyledText";
import StyledButton from "../atoms/StyledButton";

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
      <View style={[styles.card]}>
        <StyledText align='center' fontWeight='bold'>Hola {user.name}!</StyledText>
        <StyledButton onPress={() => {navigation.navigate('Scann' as never);}}>Scann</StyledButton>
      </View>
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({  
  card: {
    marginTop: 100,
    alignItems: "center",
    gap: 10,
  },
});
import React, { useEffect } from "react";
import { StyleSheet, Image, View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getLocalUser } from '../../common/Infrastructure/LocalStorageUser';
import { useState } from "react";
import Header from "../Header";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

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
        <Text style={styles.text}>Hola {user.name}!</Text>
      </View>

    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({  
  text: {
    fontSize: 20,
    margin: 5,
    fontWeight: "bold",
  },
  card: {
    marginTop: 100,
    alignItems: "center",
    justifyContent: "space-between",
  },
});
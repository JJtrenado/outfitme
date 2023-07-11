import React, { useEffect } from "react";
import { StyleSheet, Image, View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getLocalUser } from '../common/Infrastructure/LocalStorageUser';
import { useState } from "react";

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
      <TouchableOpacity onPress={() => { navigation.navigate('Settings' as never); }}>
        <Image source={{ uri: user.picture }} style={styles.profileImage} resizeMode="cover"/>
      </TouchableOpacity>
      <Text style={styles.textLogo}>outfitme</Text>
      
      <View style={[styles.card]}>
        <Text style={styles.text}>Hola {user.name} !</Text>
      </View>

    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  header: {
    flex: 1,
    height: 35,
  },
  text: {
    fontSize: 20,
    margin: 5,
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#e4e4e4",
    borderColor: "#cacaca",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    margin: 10,
    marginTop: 100,
    alignItems: "center",
    justifyContent: "space-between",
  },
  profileImage: {
    flex: 1,
    position: "absolute",
    left: 0,
    width: 35,
    height: 35,
    borderRadius: 50,
    margin: 5,
  },
  textLogo: {
    textAlign: "center",
    fontSize: 30,
    margin: 8,
    fontWeight: "bold",
  },
});
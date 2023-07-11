import React, { useEffect } from "react";
import { StyleSheet, Image, View, Text, TouchableOpacity } from "react-native";
import { useFocusEffect, useIsFocused, useNavigation } from "@react-navigation/native";
import { getLocalUser, removeLocalUser } from '../common/Infrastructure/LocalStorageUser';
import { useState } from "react";
import { reloadApp } from "../common/Application/ReloadApp";

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
    <View style={styles.container}>
      <Image source={require("../../assets/tshirt.png")} style={styles.tshirt} resizeMode="contain"/>
      <Image source={require("../../assets/text.png")} style={styles.textLogo} resizeMode="contain"/>
      <View style={styles.card}>
        <Image source={{ uri: user?.picture }} style={styles.image} />
        
        <Text style={styles.text}>Name: {user.name}</Text>
        <Text style={styles.text}>Email: {user.email}</Text>
        <TouchableOpacity style={styles.button}
          onPress={() => {
          removeLocalUser();
          reloadApp();
        }}>
          <Text style={styles.buttonText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default SettingsScreen;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#2196F3",
    borderRadius: 5,
    padding: 10,
    margin: 5,
  },
  container: {
    flex: 1,
    marginTop: 50,
    alignItems: "center",
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
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
    alignItems: "center",
    justifyContent: "space-between",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    margin: 5,
  },
  textLogo: {
    width: 150,
    height: 50,
  },
  tshirt: {
    width: 100,
    height: 100,
  },
});
import React, { useEffect } from "react";
import { StyleSheet, Image, View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getLocalUser, removeLocalUser } from '../../common/Infrastructure/LocalStorageUser';
import { useState } from "react";
import { reloadApp } from "../../common/Application/ReloadApp";
import Header from "../Header";

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
        <Image source={{ uri: user?.picture }} style={styles.image} />
        
        <Text style={styles.text}>{user.name}</Text>
        <Text style={styles.thinText}>{user.email}</Text>
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
  thinText: {
    fontSize: 16,
    margin: 5,
  },
  container: {
    marginTop: 20,
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    margin: 5,
  },
});
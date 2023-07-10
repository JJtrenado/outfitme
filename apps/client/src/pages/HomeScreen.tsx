import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getLocalUser } from '../common/Infrastructure/LocalStorageUser';
import Login from '../components/Login/Login';
import { useEffect, useState } from "react";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      const localUser = await getLocalUser();
      setUser(localUser);
    };
    checkUser();
  }, []);

  if (!user) return navigation.navigate('Login');

  return navigation.navigate('Home');

}

export default HomeScreen;
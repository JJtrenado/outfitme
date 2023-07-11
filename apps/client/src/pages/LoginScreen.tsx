// @ts-ignore
import { WEB_GOOGLE_CLIENT_ID, ANDROID_GOOGLE_CLIENT_ID, IOS_GOOGLE_CLIENT_ID }from '@env';
import React, { useEffect } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { User } from '../common/Domain/User';
import { saveLocalUser } from '../common/Infrastructure/LocalStorageUser';
import { getUserFromGoogle } from '../modules/Login/Infrastructure/getUser';
import { reloadApp } from '../common/Application/ReloadApp';
import { useNavigation } from '@react-navigation/native';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const navigation = useNavigation();

  //this disable the back button
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: null,
    });
  }, [navigation]);

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: ANDROID_GOOGLE_CLIENT_ID,
    iosClientId: IOS_GOOGLE_CLIENT_ID,
    webClientId: WEB_GOOGLE_CLIENT_ID,
    expoClientId: WEB_GOOGLE_CLIENT_ID,
  });

  useEffect(() => {
    const fetchData = async () => {
      const user: User = await getUserFromGoogle(response);
      await saveLocalUser(user);
      reloadApp();
    };
    fetchData();
  }, [response]);
  
  return (
    <View style={styles.container}>
      <Image source={require("../../assets/tshirt.png")} style={styles.tshirt} resizeMode="contain"/>
      <Image source={require("../../assets/text.png")} style={styles.textLogo} resizeMode="contain"/>
      
      <TouchableOpacity style={styles.button}
        onPress={() => {
          promptAsync();
        }}>
        <Text style={styles.buttonText}>Iniciar con Google</Text>
      </TouchableOpacity>
    </View>
  );
}

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
  container: {
    flex: 1,
    marginTop: 50,
    alignItems: "center",
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

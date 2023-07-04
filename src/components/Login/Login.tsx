import { WEB_GOOGLE_CLIENT_ID, ANDROID_GOOGLE_CLIENT_ID, IOS_GOOGLE_CLIENT_ID }from '@env';
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Updates from 'expo-updates';
import { save } from '../../modules/Login/Infraestructure/LocalStorageUser';
import { UserAdapter } from '../../modules/Login/Application/UserAdapter';

WebBrowser.maybeCompleteAuthSession();

export default function Login() {
  const [token, setToken] = useState("");
  const [userInfo, setUserInfo] = useState(null);

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: ANDROID_GOOGLE_CLIENT_ID,
    iosClientId: IOS_GOOGLE_CLIENT_ID,
    webClientId: WEB_GOOGLE_CLIENT_ID,
    expoClientId: WEB_GOOGLE_CLIENT_ID,
  });

  const reloadApp = async () => {
    await Updates.reloadAsync();
  };

  useEffect(() => {
    handleEffect();
  }, [response, token]);

  //mira si tenemos el usuario en local y en caso de que no llama a get user info que le pide a google la info del user
  async function handleEffect() {
    const user = await getLocalUser();
    if (!user) {
      if (response?.type === "success") {
        //setToken(response.authentication.accessToken);
        getUserInfo(response.authentication.accessToken);
      }
    } else {
      setUserInfo(user);
      console.log("loaded locally");
    }
  }
  
  const getLocalUser = async () => {
    const data = await AsyncStorage.getItem("@user");
    if (!data) return null;
    return JSON.parse(data);
  };

  //obtiene la informacion de usuario de google y la guarda en local
  const getUserInfo = async (token) => {
    if (!token) return;
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
        );
        
      const user = await response.json();
      //console.log("user", user);
      user.token = token; //añado el token a la info de usuario
      const formattedUser = UserAdapter(user);
      save(formattedUser);
      setUserInfo(formattedUser);
    } catch (error) {
      // Add your own error handler here
    }
  };
  console.log("user: ", AsyncStorage.getItem("@user"));
  
  return (
    <View style={styles.container}>
      {!userInfo ? (
        <Button
          title="Sign in with Google"
          disabled={!request}
          onPress={() => {
            promptAsync();
          }}
        />
      ) : (
        <View style={styles.card}>
          {userInfo?.picture && (
            <Image source={{ uri: userInfo?.picture }} style={styles.image} />
            )}
          <Text style={styles.text}>Email: {userInfo.email}</Text>
          <Text style={styles.text}>Name: {userInfo.name}</Text>
        </View>
      )}
      <Button
        title="Logout"
        onPress={async () => {await AsyncStorage.removeItem("@user")
        await Updates.reloadAsync()
        }}
      />
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
  card: {
    borderWidth: 1,
    borderRadius: 15,
    padding: 15,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});
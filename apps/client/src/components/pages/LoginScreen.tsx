// @ts-ignore
import { WEB_GOOGLE_CLIENT_ID, ANDROID_GOOGLE_CLIENT_ID, IOS_GOOGLE_CLIENT_ID }from '@env';
import React, { useEffect } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { User } from '../../modules/common/Domain/User';
import { saveLocalUser } from '../../modules/common/Infrastructure/LocalStorageUser';
import { getUserFromGoogle } from '../../modules/Login/Infrastructure/getUser';
import { reloadApp } from '../../modules/common/Application/ReloadApp';
import { useNavigation } from '@react-navigation/native';
import StyledButton from '../atoms/StyledButton';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const navigation = useNavigation();
  
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
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
      <Image source={require("../../../assets/ceroGapLogo.png")} style={styles.logo} resizeMode="contain"/>
      <StyledButton onPress={() => {promptAsync();}}>Iniciar con Google</StyledButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 30,
  },
  logo: {
    width: 150,
    height: 150,
  },
});

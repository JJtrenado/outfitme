import { Image, View, StyleSheet } from 'react-native'
import React from 'react'
import StyledText from '../atoms/StyledText';
import StyledButton from '../atoms/StyledButton';
import { logOut } from '../../modules/Login/Infrastructure/logOut';

export default function Profile(user) {
  return (
    <View style={styles.container}>
      <View style={styles.user}>
        <Image source={{ uri: user?.user.picture }} style={styles.image} />
        <StyledText align='center' fontWeight='bold'>{user.user.name}</StyledText>
        <StyledText align='center'>{user.user.email}</StyledText>
      </View>
      <StyledButton onPress={() => {logOut();}}>Cerrar sesión</StyledButton>
    </View>
  )
}

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
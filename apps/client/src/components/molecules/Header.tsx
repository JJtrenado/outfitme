import { StyleSheet, Text, Image, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from "@react-navigation/native";

export default function Header(picture) {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => { navigation.navigate('Home' as never); }}>
        <Text style={styles.textLogo}>outfitme</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => { navigation.navigate('Settings' as never); }}>
        <Image source={{ uri: picture.picture }} style={styles.profileImage} resizeMode="contain" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({  
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
  },
  profileImage: {
    width: 35,
    height: 35,
    borderRadius: 50,
  },
  textLogo: {
    fontSize: 30,
    fontWeight: "bold",
    textAlignVertical: 'center',
  },
});

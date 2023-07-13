import { StyleSheet, Text, Image, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from "@react-navigation/native";
import StyledImageButton from '../atoms/StyledImageButton';

export default function Header(picture) {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => { navigation.navigate('Home' as never); }}>
        <Text style={styles.textLogo}>outfitme</Text>
      </TouchableOpacity>
      <StyledImageButton onPress={() => { navigation.navigate('Settings' as never); }} imageSource={{ uri: picture.picture }} isRound={true} />
    </View>
  )
}

const styles = StyleSheet.create({  
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
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

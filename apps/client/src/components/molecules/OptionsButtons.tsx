import { View, StyleSheet } from 'react-native'
import React from 'react'
import BarCodeButton from '../atoms/BarCodeButton';
import StyledImageButton from '../atoms/StyledImageButton';
import OutfitButton from '../atoms/OutfitButton';
import { useNavigation } from '@react-navigation/native';

export default function OptionsButtons() {
  const navigation = useNavigation();

  return (
    <View style={[styles.buttons]}>
      <BarCodeButton onPress={() => {navigation.navigate('Scann' as never);}} size={40}/>
      <StyledImageButton onPress={() => { navigation.navigate('Garment' as never); }} imageSource={require("../../../assets/tshirtIcon.png")} size={45}/>
      <OutfitButton onPress={() => {navigation.navigate('NewOutfit' as never);}} size={40}/>
    </View>
  )
}

const styles = StyleSheet.create({  
  buttons: {
    justifyContent: "space-around",
    flexDirection: "row",
    marginVertical: 10,
    alignItems: "center",
  },
});
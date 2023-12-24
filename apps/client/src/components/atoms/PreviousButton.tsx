import { TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { AntDesign } from '@expo/vector-icons'; 
import theme from '../theme';

interface OutfitButtonProps {
  onPress?: () => void;
  size?: number;
  color?: string;
  style?: object;
  buttonStyles?: object;
}
  

const styles = StyleSheet.create({
  icon: {
    color: theme.colors.primary,
    fontSize: 35,
  },
});

export default function PreviousButton({ onPress, size, color, style, buttonStyles, ...restOfProps }: OutfitButtonProps) {
  const iconStyles = [
    styles.icon,
    color && { color: color },
    size && { fontSize: size },
    style,
  ];
  return (
    <TouchableOpacity style={buttonStyles} onPress={onPress} {...restOfProps}>
      <AntDesign name="stepbackward" size={24} color="white" />
    </TouchableOpacity>
  )
}

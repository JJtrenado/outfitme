import { TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { MaterialIcons } from '@expo/vector-icons'; 
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

export default function DeleteButton({ onPress, size, color, style, buttonStyles, ...restOfProps }: OutfitButtonProps) {
  const iconStyles = [
    styles.icon,
    color && { color: color },
    size && { fontSize: size },
    style,
  ];
  return (
    <TouchableOpacity style={buttonStyles} onPress={onPress} {...restOfProps}>
      <MaterialIcons name="delete-forever" size={28} color={ color ? color: "#24292e" } />
    </TouchableOpacity>
  )
}

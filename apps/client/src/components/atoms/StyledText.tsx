import React from 'react'
import { StyleProp, TextStyle, Text, StyleSheet } from 'react-native'
import theme from '../theme'

interface StyledTextProps {
  align?: string;
  color?: string;
  fontSize?: string;
  fontWeight?: string;
  style?: StyleProp<TextStyle>;
  children: any;
}

const styles = StyleSheet.create({
  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.normal
  },
  colorSecondary: {
    color: theme.colors.textSecondary
  },
  bold: {
    fontWeight: theme.fontWeights.bold
  },
  subheading: {
    fontSize: theme.fontSizes.subheading
  },
  textAlignCenter: {
    textAlign: 'center'
  }
})



export default function StyledText({ align, color, fontSize, fontWeight, style, children, ...restOfProps }: StyledTextProps) {
  const textStyles = [
    styles.text,
    align === 'center' && styles.textAlignCenter,
    color === 'primary' && styles.colorPrimary,
    color === 'secondary' && styles.colorSecondary,
    fontSize === 'subheading' && styles.subheading,
    fontWeight === 'bold' && styles.bold,
    style
  ];

  return (
    <Text style={textStyles} {...restOfProps}>
      {children}
    </Text>
  );
}

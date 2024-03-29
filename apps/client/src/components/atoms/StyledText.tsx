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
  colorError: {
    color: theme.colors.textError
  },
  colorWhite: {
    color: theme.colors.white
  },
  bold: {
    fontWeight: theme.fontWeights.bold
  },
  subheading: {
    fontSize: theme.fontSizes.subheading
  },
  title: {
    fontSize: theme.fontSizes.title
  },
  textAlignCenter: {
    textAlign: 'center'
  },
  textAlignRight: {
    textAlign: 'right'
  }
})



export default function StyledText({ align, color, fontSize, fontWeight, style, children, ...restOfProps }: StyledTextProps) {
  const textStyles = [
    styles.text,
    align === 'center' && styles.textAlignCenter,
    align === 'right' && styles.textAlignRight,
    color === 'primary' && styles.colorPrimary,
    color === 'secondary' && styles.colorSecondary,
    color === 'error' && styles.colorError,
    color === 'white' && styles.colorWhite,
    fontSize === 'subheading' && styles.subheading,
    fontSize === 'title' && styles.title,
    fontWeight === 'bold' && styles.bold,
    style
  ];

  return (
    <Text style={textStyles} {...restOfProps}>
      {children}
    </Text>
  );
}

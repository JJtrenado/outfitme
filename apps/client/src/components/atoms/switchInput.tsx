import React from 'react';
import { View, StyleSheet, Switch } from 'react-native';
import { Controller } from 'react-hook-form';
import StyledText from './StyledText';
import theme from '../theme';

const SwitchInput = ({
  control,
  name,
  placeholder,
  defaultValue,
}) => {
  return (
    <View style={styles.switchContainer}>
      <StyledText>{placeholder}</StyledText>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <Switch
            value={value}
            onValueChange={onChange}
            trackColor={{false: '#767577', true: theme.brandColors.logoPurple}}
            thumbColor={theme.colors.accent}
          />
        )}
        defaultValue={defaultValue}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 10,
  },
});

export default SwitchInput;

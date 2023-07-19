import React from 'react';
import { View, Text, TextInput, StyleSheet, Switch } from 'react-native';
import { Controller } from 'react-hook-form';
import { Picker } from '@react-native-picker/picker';
import StyledText from './StyledText';

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
          <Switch value={value} onValueChange={onChange} />
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

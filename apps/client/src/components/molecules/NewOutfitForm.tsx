//
//
//It is provisional, do not review it in PR.
//
//
import React from 'react';
import { View, TextInput, Button, Text, StyleSheet, Switch } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useForm, Controller } from 'react-hook-form';
import StyledText from '../atoms/StyledText';
import StyledButton from '../atoms/StyledButton';

const NewOutfitForm = () => {
  const { control, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = data => {
    console.log(data);
  };

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Picker
            style={styles.input}
            onBlur={onBlur}
            onValueChange={onChange}
            selectedValue={value}
          >
            <Picker.Item label="Prenda1" value="Prenda1" />
            <Picker.Item label="Prenda2" value="Prenda2" />
            <Picker.Item label="Prenda3" value="Prenda3" />
            <Picker.Item label="Cabeza" value="Cabeza" />
          </Picker>
        )}
        name="head"
        rules={{ required: false }}
        defaultValue="Cabeza"
      />

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Picker
            style={styles.input}
            onBlur={onBlur}
            onValueChange={onChange}
            selectedValue={value}
          >
            <Picker.Item label="Prenda1" value="Prenda1" />
            <Picker.Item label="Prenda2" value="Prenda2" />
            <Picker.Item label="Prenda3" value="Prenda3" />
            <Picker.Item label="Torso" value="Torso" />
          </Picker>
        )}
        name="torso"
        rules={{ required: false }}
        defaultValue="Torso"
      />

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Picker
            style={styles.input}
            onBlur={onBlur}
            onValueChange={onChange}
            selectedValue={value}
          >
            <Picker.Item label="Prenda1" value="Prenda1" />
            <Picker.Item label="Prenda2" value="Prenda2" />
            <Picker.Item label="Prenda3" value="Prenda3" />
            <Picker.Item label="Piernas" value="Piernas" />
          </Picker>
        )}
        name="legs"
        rules={{ required: false }}
        defaultValue="Piernas"
      />

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Picker
            style={styles.input}
            onBlur={onBlur}
            onValueChange={onChange}
            selectedValue={value}
          >
            <Picker.Item label="Prenda1" value="Prenda1" />
            <Picker.Item label="Prenda2" value="Prenda2" />
            <Picker.Item label="Prenda3" value="Prenda3" />
            <Picker.Item label="Pies" value="Pies" />
          </Picker>
        )}
        name="feet"
        rules={{ required: false }}
        defaultValue="Pies"
      />

      <StyledButton onPress={handleSubmit(onSubmit)}>Crear Outfit</StyledButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
});

export default NewOutfitForm;

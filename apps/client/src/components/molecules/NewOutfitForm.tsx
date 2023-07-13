import React from 'react';
import { View, TextInput, Button, Text, StyleSheet, Switch } from 'react-native';
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
          <select 
            style={styles.input}
            onBlur={onBlur}
            onChange={onChange}
            value={value}
            placeholder="Cabeza"
          >
            <option value="Prenda1">Prenda1</option>
            <option value="Prenda2">Prenda2</option>
            <option value="Prenda3">Prenda3</option>
            <option value="Cabeza">Cabeza</option>
          </select>
        )}
        name="head"
        rules={{ required: false }}
        defaultValue="Cabeza"
      />

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <select 
            style={styles.input}
            onBlur={onBlur}
            onChange={onChange}
            value={value}
            placeholder="Torso"
          >
            <option value="Prenda1">Prenda1</option>
            <option value="Prenda2">Prenda2</option>
            <option value="Prenda3">Prenda3</option>
            <option value="Torso">Torso</option>
          </select>
        )}
        name="torso"
        rules={{ required: false }}
        defaultValue="Torso"
      />

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <select 
            style={styles.input}
            onBlur={onBlur}
            onChange={onChange}
            value={value}
            placeholder="Piernas"
          >
            <option value="Prenda1">Prenda1</option>
            <option value="Prenda2">Prenda2</option>
            <option value="Prenda3">Prenda3</option>
            <option value="Piernas">Piernas</option>
          </select>
        )}
        name="legs"
        rules={{ required: false }}
        defaultValue="Piernas"
      />

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <select 
            style={styles.input}
            onBlur={onBlur}
            onChange={onChange}
            value={value}
            placeholder="Pies"
          >
            <option value="Prenda1">Prenda1</option>
            <option value="Prenda2">Prenda2</option>
            <option value="Prenda3">Prenda3</option>
            <option value="Pies">Pies</option>
          </select>
        )}
        name="feet"
        rules={{ required: false }}
        defaultValue="Pies"
      />

      <StyledButton onPress={() => {handleSubmit(onSubmit);}}>Crear Outfit</StyledButton>
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

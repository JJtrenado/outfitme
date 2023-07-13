import React from 'react';
import { View, TextInput, Button, Text, StyleSheet, Switch } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import StyledText from '../atoms/StyledText';
import StyledButton from '../atoms/StyledButton';

const NewGarmentForm = () => {
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
            placeholder="gender"
          >
            <option value="Cabeza">Cabeza</option>
            <option value="Torso">Torso</option>
            <option value="Piernas">Piernas</option>
            <option value="Pies">Pies</option>
          </select>
        )}
        name="bodyPart"
        rules={{ required: true }}
        defaultValue=""
      />
      {errors.bodyPart && <Text style={styles.errorText}>Este campo es requerido.</Text>}

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
          style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Marca"
            />
        )}
        name="brand"
        rules={{ required: false }}
        defaultValue=""
      />

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Descripción"
          />
        )}
        name="description"
        rules={{ required: false }}
        defaultValue=""
      />
      <View style={styles.switchContainer}>
        <StyledText>Prenda disponible: </StyledText>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <Switch value={value} onValueChange={onChange} />
          )}
          name="avaliable"
          defaultValue={false}
        />
      </View>
      <StyledButton onPress={() => {handleSubmit(onSubmit);}}>Crear Prenda</StyledButton>
            
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

export default NewGarmentForm;

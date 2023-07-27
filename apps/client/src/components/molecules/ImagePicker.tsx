import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ImagePickerExample({ onPickerSuccess }) {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    const imagePickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (imagePickerResult.canceled) {
      console.log('Image selection cancelled.');
      return;
    }

    const { uri } = imagePickerResult;
    let bodyContent = new FormData();
    bodyContent.append("file", {
      uri,
      name: `image.jpg`,
      type: 'image/jpeg',
    });
    onPickerSuccess(bodyContent);
  };

  return (
    <View >
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
    </View>
  );
}

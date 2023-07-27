import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, FlatList } from 'react-native';
import { getGarmentByUser } from '../../modules/Garment/Infrastructure/getGarments';
import { Garment } from '../../modules/Garment/Domain/garment';


const GarmentListSimple = ( {jwt, userId} ) => {
  const [garmentsData, setGarmentsData] = useState<Garment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const garments = await getGarmentByUser(jwt, userId);
        setGarmentsData(garments);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching garments:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View>
      <FlatList
        data={garmentsData}
        renderItem={({ item }) => (
          <View>
            <Text>User: {item.user}</Text>
            <Text>BarCode: {item.barCode}</Text>
            <Text>Type: {item.type}</Text>
            <Text>Brand: {item.brand}</Text>
            <Text>Model: {item.model}</Text>
            <Text>Description: {item.description}</Text>
            <Text>Available: {item.available ? 'Yes' : 'No'}</Text>
            <Text>ImagePath: {item.imagePath}</Text>
          </View>
        )}
        keyExtractor={(item) => item.barCode}
      />
    </View>
  );
};

export default GarmentListSimple;


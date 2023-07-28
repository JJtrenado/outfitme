import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, FlatList, Image } from 'react-native';
import { getGarmentByUser } from '../../modules/Garment/Infrastructure/getGarments';
import { Garment } from '../../modules/Garment/Domain/garment';
import { StyleSheet } from 'react-native';

const GarmentListSimple = ({ jwt, userId }) => {
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
  
  console.log('garmentsData', garmentsData);

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={garmentsData}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <View>
              <Text>User: {item.user}</Text>
              <Text>BarCode: {item.barCode}</Text>
              <Text>Type: {item.type}</Text>
              <Text>Brand: {item.brand}</Text>
              <Text>Model: {item.model}</Text>
              <Text>Description: {item.description}</Text>
              <Text>Available: {item.available ? 'Yes' : 'No'}</Text>
            </View>
            <Image
              source={{ uri: `http://192.168.1.19:3000/garments/${item.imagePath}` }}
              style={styles.itemImage}
            />
          </View>
        )}
        keyExtractor={(item) => item.barCode}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemImage: {
    width: 100,
    height: 100,
  },
});

export default GarmentListSimple;
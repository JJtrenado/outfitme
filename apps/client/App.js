import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import { LogBox } from 'react-native';

import HomeScreen from "./src/components/pages/HomeScreen";
import LoginScreen from "./src/components/pages/LoginScreen";
import SettingsScreen from "./src/components/pages/SettingsScreen";
import ScannScreen from "./src/components/pages/ScannScreen";
import GarmentScreen from "./src/components/pages/GarmentsScreen";
import NewOutfitScreen from './src/components/pages/NewOutfitScreen';
import NewGarmentScreen from './src/components/pages/NewGarmentScreen';

const Stack = createStackNavigator();

export default function App() { 
  LogBox.ignoreAllLogs();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Scann" component={ScannScreen} />
        <Stack.Screen name="Garment" component={GarmentScreen} />
        <Stack.Screen name="NewGarment" component={NewGarmentScreen} />
        <Stack.Screen name="NewOutfit" component={NewOutfitScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
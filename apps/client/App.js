import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from "./src/components/pages/HomeScreen";
import LoginScreen from "./src/components/pages/LoginScreen";
import SettingsScreen from "./src/components/pages/SettingsScreen";
import ScannScreen from "./src/components/pages/ScannScreen";

const Stack = createStackNavigator();

export default function App() { 
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Scann" component={ScannScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
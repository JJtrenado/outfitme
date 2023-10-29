import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getLocalUser } from '../../modules/common/Infrastructure/LocalStorageUser';
import Header from "../molecules/Header";
import GarmentListSimple from "../molecules/GarmentView";
import StyledButton from "../atoms/StyledButton";
import StyledText from "../atoms/StyledText";

const GarmentScreen = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const localUser = await getLocalUser();
      setUser(localUser);
      setIsLoading(false);
    };
    
    fetchUser();
  }, []);

  if (isLoading) {
    return null;
  }

  if (!user) {
    navigation.navigate('Login' as never);
    return null;
  }

  return (
    <>
      <Header picture={user.picture} />
      
      <ScrollView>
        <StyledText align="center" fontWeight="bold" fontSize='title' style={{ marginTop: 20 }}>Tus Prendas</StyledText>
        <GarmentListSimple jwt={user.jwt.jwt} userId={user.email}/>
      </ScrollView>
      <StyledButton style={styles.floatingButton} onPress={() => {navigation.navigate('NewGarment' as never);}}>+</StyledButton>
    </>
  );
}

const styles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 50,
    justifyContent: 'center',
    elevation: 5,
  },
});

export default GarmentScreen;

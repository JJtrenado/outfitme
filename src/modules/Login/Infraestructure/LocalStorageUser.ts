import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../Domain/User';

export async function saveLocalUser(user: User) {
	await AsyncStorage.setItem("@user", JSON.stringify(user));
}

export async function getLocalUser(): Promise<User | null> { //devuelve un user o null
	const data = await AsyncStorage.getItem("@user");
	if (!data) return null;
	return JSON.parse(data);
}

export async function removeLocalUser() { 	
	await AsyncStorage.removeItem("@user");
}
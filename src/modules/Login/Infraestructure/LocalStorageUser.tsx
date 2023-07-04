import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../Domain/User';

export async function save(user: User) {
	await AsyncStorage.setItem("@user", JSON.stringify(user));
}
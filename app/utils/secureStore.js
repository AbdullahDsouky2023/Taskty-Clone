import * as SecureStore from 'expo-secure-store';

export async function setItem(key, value) {
  try {
    const jsonValue = JSON.stringify(value);
    await SecureStore.setItemAsync(key, jsonValue);
  } catch (error) {
    console.error('Error while setting item:', error);
  }
}


export async function getItem(key) {
  try {
    const jsonValue = await SecureStore.getItemAsync(key);
    if (jsonValue) {
      return JSON.parse(jsonValue);
    }
    return null; // Handle the case where the item does not exist
  } catch (error) {
    console.error('Error while getting item:', error);
    return null;
  }
}

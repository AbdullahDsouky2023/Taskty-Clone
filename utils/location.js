import AsyncStorage from "@react-native-async-storage/async-storage";

export const getLocationFromStorage = async () => {
    try {
      const location = await AsyncStorage.getItem('userLocation');
        console.log("getting hte location",location)
        return location
      
    } catch (error) {
      console.error('Error retrieving location from storage:', error);
    }
  
    return null; // Return null if the location is not found or an error occurs.
  };
  
  // Example usage:
  
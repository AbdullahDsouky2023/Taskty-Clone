import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";

const reverseGeoCode = async (location) => {
    try {
       const parseLocation =  JSON.parse(location)
      const reverGeoCodeAdress = await Location.reverseGeocodeAsync({
        longitude: parseLocation.longitude,
        latitude: parseLocation.latitude,
      });
      return (reverGeoCodeAdress[0]);
    } catch (error) {
        console.log("erre",error)
    }
  };
export const getLocationFromStorage = async () => {
    try {
      const location = await AsyncStorage.getItem('userLocation');
      const Reable = await  reverseGeoCode(location)
      console.log( `${Reable.city} - ${Reable.subregion} - ${Reable.country}`)
      return  `${Reable.city} - ${Reable.subregion} - ${Reable.country}` 

      
    } catch (error) {
      console.error('Error retrieving location from storage:', error);
    }
  
    return null; // Return null if the location is not found or an error occurs.
  };
  
  // Example usage:
  
import React, { useEffect, useMemo, useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  View,
  StyleSheet,
  ScrollView,
  Alert,
  Dimensions,
  FlatList,
} from "react-native";
import * as yup from "yup";
import { useTranslation } from "react-i18next";

import ArrowBack from "../../component/ArrowBack";
import { Colors } from "../../constant/styles";
import AppText from "../../component/AppText";

import { auth, } from "../../../firebaseConfig";

import * as Updates from "expo-updates";
import { CheckBox, Icon } from "@rneui/themed";
import { Ionicons } from '@expo/vector-icons'; 

import LoadingModal from "../../component/Loading";
import { useDispatch, useSelector } from "react-redux";
import { getUserByPhoneNumber, updateUserData } from "../../../utils/user";
import { setUserData } from "../../store/features/userSlice";
import { getLocationFromStorage } from "../../../utils/location";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MANUAL_LOCATION_ADD } from "../../navigation/routes";
import SelectLocationItem from "../../component/location/SelectLocationItem";
import AppButton from "../../component/AppButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
const { width } = Dimensions.get("screen");


const SlectLocationOrderScreen = ({ navigation,route }) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [currentLocation, setCurrentLocation] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const validPhone = auth?.currentUser?.phoneNumber?.replace("+", "");
  const userData = useSelector((state) => state.user?.userData);
  const [ manualLocations,setManualLocations] = useState([])
  useEffect(() => {
    loadManualLocations();
    console.log("this load function was called")
    // Check if there are updated locations from the AddAddressScreen
    if (route.params?.updatedLocations) {
      setManualLocations(route?.params?.updatedLocations);
    }
  }, [route?.params?.updatedLocations]);

  const loadManualLocations = async () => {
    try {
      const storedLocations = await AsyncStorage.getItem("manualLocations");

      if (storedLocations !== null) {
        setManualLocations(JSON.parse(storedLocations));
        console.log("manual location found ", JSON.parse(storedLocations));
      }
    } catch (error) {
      console.error("Error loading manual locations:", error);
    }
  };
  const getCurrentLocationFromStorage = async () => {
    try {
        const location = await getLocationFromStorage();
        setCurrentLocation(location);
        selectedLocation(location);
        
    } catch (error) {
        
    }
    //    console.log(location)
  };
  useEffect(() => {
    getCurrentLocationFromStorage();
  }, []);
  console.log('====================================');
  console.log(selectedLocation );
  console.log('====================================');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <StatusBar backgroundColor={Colors.primaryColor} />
      <View style={{ flex: 1 }}>
        <ArrowBack />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ flex: 1, alignItems: "center" }}>
            <View style={styles.headerContainer}>

            <AppText
              text={"address"}
              style={{ color: Colors.primaryColor, marginBottom: 10 ,fontSize:19}}
              />
              <TouchableOpacity onPress={()=>navigation.navigate(MANUAL_LOCATION_ADD,{order:true})}>
              <Ionicons name="ios-add-circle-outline" size={32} color={Colors.blackColor} />
              </TouchableOpacity>
              </View>
              <SelectLocationItem selectedLocation={selectedLocation} currentLocation={currentLocation} setSelectedLocation={setSelectedLocation}/>
            <View>
              <AppText
                text={"Manual Location"}
                centered={false}
                style={{ color: Colors.blackColor, marginBottom: 10 }}
              />
              {/* currentLocation primary */}
              <FlatList
        data={manualLocations}
        renderItem={({ item }) => (
          <SelectLocationItem selectedLocation={selectedLocation} currentLocation={item} setSelectedLocation={setSelectedLocation}/>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
            </View>
          </View>
        </ScrollView>
          {selectedLocation && <AppButton title={"comfirm"}/>}
        <LoadingModal visible={!currentLocation} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  currentLocation: {
    height: "auto",
    width: width * 0.95,
    borderRadius: 10,
    backgroundColor: Colors.primaryColor,
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginVertical:10,
    padding: 10,
  },
  headerContainer:{
    display: "flex",
    alignContent: "center",
    width:width*0.94,
    marginTop:10,
    justifyContent: "space-between",
    flexDirection: "row",
  }
});

export default SlectLocationOrderScreen;

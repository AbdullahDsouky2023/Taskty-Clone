import React, { useEffect, useMemo, useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  View,
  StyleSheet,
  ScrollView,
  Alert,
  Dimensions,
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
const { width } = Dimensions.get("screen");


const LocationScreen = ({ navigation }) => {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [currentLocation, setCurrentLocation] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const validPhone = auth?.currentUser?.phoneNumber?.replace("+", "");
  const userData = useSelector((state) => state.user?.userData);
  // let user = useSelector((state) => state.user?.user?.phoneNumber);
  const validationSchema = yup.object().shape({
    fullName: yup
      .string()
      // .required(t("Full name is required"))
      .min(2, "الاسم  المدخل قصير جدا")
      .max(50, "الاسم المدخل طويل جدا"),
    emailAddress: yup.string().email("الايميل المدخل غير صالح"),
    // .required("الايميل مطلوب"),
    location: yup.string(),
    // .required(t("Email is required")),
  });
  const handleFormSubmit = async (values) => {
    try {
      setIsLoading(true);
      console.log("this is the use data will be submite", {
        email: values.emailAddress || userData?.email,
        username: values.fullName || userData?.username,
        location: values.location,
        phoneNumber: Number(validPhone),
      });
      const res = await updateUserData(userData?.id, {
        location: values.location,
        // phoneNumber: Number(validPhone),
      });
      if (res) {
        const gottenuser = await getUserByPhoneNumber(Number(validPhone));
        dispatch(setUserData(gottenuser));
        // console.log("success",gottenuser)
        Alert.alert("تم التعديل بنجاح");
        Updates.reloadAsync();

        navigation.navigate("Splash");
      } else {
        console.log(res);
        Alert.alert("Something goes wrong");
      }
    } catch (err) {
      console.log("error creating the resi", err);
    } finally {
      setIsLoading(false);
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
              <TouchableOpacity onPress={()=>navigation.navigate(MANUAL_LOCATION_ADD)}>
<Ionicons name="ios-add-circle-outline" size={32} color={Colors.blackColor} />
              </TouchableOpacity>
              </View>
            <View>
              <AppText
                text={"current Location"}
                centered={false}
                style={{ color: Colors.blackColor, marginBottom: 10 }}
              />
              {/* currentLocation primary */}
              <View style={[styles.currentLocation,{
                backgroundColor:currentLocation === selectedLocation ? Colors.primaryColor : Colors.whiteColor
                ,borderWidth:currentLocation === selectedLocation ? 0 :1
              }]}>
                <CheckBox
                containerStyle={{backgroundColor:"transparent"}}
                  center
                  checkedIcon={
                    <Icon
                      name="radio-button-checked"
                      type="material"
                      color={Colors.white}
                      size={25}
                      iconStyle={{ marginRight: 10,color:Colors.whiteColor }}
                    />
                  }
                  uncheckedIcon={
                    <Icon
                      name="radio-button-unchecked"
                      type="material"
                      color="grey"
                      size={25}
                      iconStyle={{ marginRight: 10,color:Colors.blackColor }}
                    />
                  }
                  checked={selectedLocation === currentLocation}
                  onPress={() => setSelectedLocation(currentLocation)}
                />
                <AppText
                  text={currentLocation}
                  centered={false}
                  style={{ color:currentLocation === selectedLocation ? Colors.whiteColor: Colors.blackColor, marginBottom: 10 }}
                />
              </View>
            </View>
            <View>
              <AppText
                text={"Manual Location"}
                centered={false}
                style={{ color: Colors.blackColor, marginBottom: 10 }}
              />
              {/* currentLocation primary */}
              {/* <FlatList
        data={manualLocations}
        renderItem={({ item }) => (
          // Render your manual location item here
          // Example: <Text>{item}</Text>
        )}
        keyExtractor={(item, index) => index.toString()}
      /> */}
            </View>
          </View>
        </ScrollView>
        <LoadingModal visible={isLoading} />
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

export default LocationScreen;

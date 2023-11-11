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
import AppForm from "../../component/Form/Form";
import AppFormField from "../../component/Form/FormField";
import ErrorMessage from "../../component/Form/ErrorMessage";
import SubmitButton from "../../component/Form/FormSubmitButton";
const { width } = Dimensions.get("screen");


const AddManualLocationScreen = ({ navigation }) => {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [selectedLocation, setSelectedLocation] = useState();
  const validPhone = auth?.currentUser?.phoneNumber?.replace("+", "");
  const userData = useSelector((state) => state.user?.userData);
  const [currentLocation, setCurrentLocation] = useState("");
  // let user = useSelector((state) => state.user?.user?.phoneNumber);
  const validationSchema = yup.object().shape({
    
     location:yup.string()
     .min(5,"العنوان المدخل قصير جدا ")
     .max(100,"العنوان المدخل قصير جدا ")
     .required(t("Please add the location"))
      // .required(t("Email is required")),
  });

  const handleFormSubmit = async (values) => {
    try {
      setIsLoading(true);
      console.log("this is the use data will be submite", {
        location: values.location,
      });
    //   const res = await updateUserData(userData?.id, {
    //     location: values.location,
    //     // phoneNumber: Number(validPhone),
    //   });
    //   if (res) {
    //     const gottenuser = await getUserByPhoneNumber(Number(validPhone));
    //     dispatch(setUserData(gottenuser));
    //     // console.log("success",gottenuser)
    //     Alert.alert("تم التعديل بنجاح");
    //     Updates.reloadAsync();

    //     navigation.navigate("Splash");
    //   } else {
    //     console.log(res);
    //     Alert.alert("Something goes wrong");
    //   }
    } catch (err) {
      console.log("error creating the resi", err);
    } finally {
      setIsLoading(false);
    }
  };
  const getCurrentLocationFromStorage = async () => {
    const location = await getLocationFromStorage();
    //    console.log(location)
    setCurrentLocation(location);
  };
  useEffect(() => {
    getCurrentLocationFromStorage();
  }, []);
  console.log('====================================');
  console.log(selectedLocation === "current");
  console.log('====================================');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <StatusBar backgroundColor={Colors.primaryColor} />
      <View style={{ flex: 1 }}>
        <ArrowBack />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ flex: 1, alignItems: "center" }}>

            <AppText
              text={"Add Address"}
              style={{ color: Colors.primaryColor, marginBottom: 10 ,fontSize:19}}
              />
              
              <AppForm
              enableReinitialize={true}
              initialValues={{ location:"" }}
              onSubmit={(data) => handleFormSubmit(data)}
              validationSchema={validationSchema}
            >
              <ErrorMessage error={error} visible={error} />
              <AppFormField
                autoCorrect={false}
                name="location"
                // placeholder="fullName"
                icon = {"user"}
                // placeholder={"location"}
              />
              <SubmitButton title="Save" />
            </AppForm>
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

export default AddManualLocationScreen;

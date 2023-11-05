import React, { useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Alert,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useDispatch } from "react-redux";
import { CommonActions } from '@react-navigation/native';

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Colors } from "../../constant/styles";
import ArrowBack from "../../component/ArrowBack";
import AppButton from "../../component/AppButton";
import AppText from "../../component/AppText";
import LoadingModal from "../../component/Loading";
import OtpFields from "../../component/OtpFields";
import { errorMessages } from "../../data/signin";
import { userRegisterSuccess } from "../../store/features/userSlice";
import { auth, db } from "../../../firebaseConfig";
import { changeUserInfo } from "../../utils/firebase/user";
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";

const { width } = Dimensions.get("screen");

const VerificationScreen = ({ navigation, route }) => {
  const [isLoading, setisLoading] = useState(false);
  const [otpInput, setOtpInput] = useState("");
  const [resendDisabled, setResendDisabled] = useState(true);
  const [secondsRemaining, setSecondsRemaining] = useState(60);
  const dispatch = useDispatch();

  const { result, handleSendVerificationCode, phoneNumber } = route.params;

  const confirmVerificationCode = async () => {
    try {
      const usersRef = collection(db, "users");
      const res = await result.confirm(otpInput);
      setResendDisabled(true);
      setSecondsRemaining(60);

      dispatch(userRegisterSuccess(auth?.currentUser));
      await AsyncStorage.setItem("userData", JSON.stringify(auth?.currentUser));
        const phoneNumberQuery = query(
          usersRef,
          where("phoneNumber", "==", phoneNumber)
        );

        console.log('this is the user phone number which will be conaire',phoneNumber)
        const querySnapshot = await getDocs(phoneNumberQuery);
        console.log(querySnapshot)
  
        if (querySnapshot.empty) {
          console.log('user is noooot  found and this name ',querySnapshot.empty);

          return navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'Register' }], // Replace 'Login' with the name of your login screen
            })
          );  
          
        } else {
          console.log('user is found and this name ',querySnapshot.empty);
          return navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'App' }], // Replace 'Login' with the name of your login screen
            })
          );  
          }
    } catch (error) {
      const errorMessage =
        errorMessages[error.message] ||
        "حدث خطأ غير معروف. الرجاء المحاولة مرة أخرى";
      Alert.alert(errorMessage);

    } finally {
      setOtpInput("");
    }
  };

  useEffect(() => {
    if (resendDisabled) {
      const timer = setInterval(() => {
        if (secondsRemaining > 0) {
          setSecondsRemaining(secondsRemaining - 1);
        } else {
          setResendDisabled(false); // Enable the "Resend SMS" button
          clearInterval(timer);
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [resendDisabled, secondsRemaining]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <StatusBar backgroundColor={Colors.primaryColor} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <ArrowBack />
        <View>
          <View style={styles.textContainer}>
            <AppText
              text={"verification"}
              style={{
                fontSize: 28,
                color: Colors.primaryColor,
                marginBottom: 10,
              }}
              centered={false}
            />
            <AppText
              text={"enterOTPCode"}
              centered={false}
              style={{ fontSize: 17 }}
            />
          </View>
          <OtpFields
            setisLoading={setisLoading}
            setOtpInput={setOtpInput}
            otpInput={otpInput}
            confirmVerificationCode={(otpInput) =>
              confirmVerificationCode(otpInput)
            }
            // clearOtpInput={clearOtpInput} // Pass the clearOtpInput function

          />
          <AppButton
            title={"Continue"}
            path={"Register"}
            // disabled={otpInput.length === 6 }
            onPress={confirmVerificationCode}
          />
          <View style={styles.sendMessasesContainer}>
            <AppText
              text={"didntReceiveOTP"}
              style={{
                fontSize: 18,
                paddingTop: 44,
                paddingRight: 20,
              }}
              centered={false}
            />
            <AppButton
              title={
                resendDisabled ? ` ارسال(${secondsRemaining}s)` : "ارسال SMS"
              }
              disabled={resendDisabled}
              onPress={() => {
                setResendDisabled(true);
                setSecondsRemaining(60);
                handleSendVerificationCode();
              }}
            />
          </View>
        </View>
      </ScrollView>
      <LoadingModal visible={isLoading} />
    </SafeAreaView>
  );
};

export default VerificationScreen;
const styles = StyleSheet.create({
  textContainer: {
    flex: 1,
    alignItems: "flex-start",
    marginTop: 10,
    paddingHorizontal: 25,
  },
  sendMessasesContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: 10,
    // marginRight: 25,
    justifyContent: "space-between",
    flexDirection: "row",
  },
});

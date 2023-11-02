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

import { Colors } from "../../constant/styles";
import ArrowBack from "../../component/ArrowBack";
import AppButton from "../../component/AppButton";
import AppText from "../../component/AppText";
import LoadingModal from "../../component/Loading";
import OtpFields from "../../component/OtpFields";
import { errorMessages } from "../../data/signin";
import { useDispatch } from "react-redux";
import { userRegisterSuccess } from "../../store/features/userSlice";
import { auth } from "../../../firebaseConfig";
import { getItem, setItem } from "../../utils/secureStore";
const { width } = Dimensions.get("screen");

const VerificationScreen = ({ navigation, route }) => {
  
  const [isLoading, setisLoading] = useState(false);
  const { result ,handleSendVerificationCode} = route.params;
  const [otpInput, setOtpInput] = useState("454545");
  const [resendDisabled, setResendDisabled] = useState(true);
  const [secondsRemaining, setSecondsRemaining] = useState(60);

    const dispatch = useDispatch()

  const confirmVerificationCode = async () => {
    try {
      console.log("helllllllo",otpInput)
      const res = await result.confirm(otpInput);
      console.log(otpInput, "this is the confiramtion sent ")
      setResendDisabled(true);
      setSecondsRemaining(60);
      //  dispatch(userRegisterSuccess(auth?.currentUser));
      // await setItem("userData", auth?.currentUser);
        console.log('******************************** user verfication **************')
        console.log(auth.currentUser)
        console.log('******************************** user verfication **************')
      navigation.navigate("App");
    } catch (error) {
      const errorMessage = errorMessages[error.message] 

      console.log('the error is ',errorMessage ,error.message)
      Alert.alert(errorMessage);
    }finally {
      setOtpInput("")

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
              centered={true}
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
            confirmVerificationCode={(otpInput)=>confirmVerificationCode(otpInput)}
          />
          <AppButton
            title={"Continue"}
            path={"Register"}
            // disabled={otpInput.length === 6 }
            onPress={ confirmVerificationCode}
          />
          <View style={styles.sendMessasesContainer}>
            <AppText
              text={"didntReceiveOTP"}
              style={{
                fontSize: 18,
                paddingTop:30,
                paddingRight:20
              }}
              centered={false}
            />
            <AppButton
              title={
                resendDisabled
                  ? ` ارسال(${secondsRemaining}s)`
                  : "ارسال SMS"
              }
              disabled={resendDisabled}
              onPress={() => {
                setResendDisabled(true);
                setSecondsRemaining(60);
                handleSendVerificationCode()}}
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
    justifyContent:'space-between',
    flexDirection:'row'
  },
});

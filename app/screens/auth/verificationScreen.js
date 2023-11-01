import React, { useState } from "react";
import { View, SafeAreaView, StatusBar, ScrollView, Alert } from "react-native";

import { Colors } from "../../constant/styles";
import ArrowBack from "../../component/ArrowBack";
import AppButton from "../../component/AppButton";
import AppText from "../../component/AppText";
import LoadingModal from "../../component/Loading";
import OtpFields from "../../component/OtpFields";
import Timer from "../../component/Timer";
import { signInWithCredential } from "firebase/auth";

const VerificationScreen = ({ navigation , route}) => {
  const [isLoading, setisLoading] = useState(false);
  const {result} = route.params
  const [otpInput, setOtpInput] = useState("");

  const confirmVerificationCode = async (otpInput) => {
    try {
      const res = await result.confirm(otpInput)
    
      // Store the confirmation result in the state
      console.log("confirmationresult",res);

      // Show an alert message to indicate the sign in was successful
     navigation.navigate('Register')
    } catch (error) {
      // Handle any errors
      Alert.alert(`Error: ${error}`);
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <StatusBar backgroundColor={Colors.primaryColor} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <ArrowBack />
        <View>
          <AppText
            text={"verification"}
            style={{
              fontSize: 28,
              color: Colors.primaryColor,
              textAlign: "left",
              paddingRight: 42,
              marginBottom: 10,
            }}
          />
          <AppText text={"enterOTPCode"} />
          <OtpFields setisLoading={setisLoading} setOtpInput={setOtpInput}  otpInput={otpInput} confirmVerificationCode={
            confirmVerificationCode
          }/>
          <AppButton title={"Continue"} path={"Register"} onPress={()=>confirmVerificationCode(otpInput)} />

          <AppText
            text={"didntReceiveOTP"}
            style={{
              margin: 18,
            }}
          />
          <Timer />
        </View>
      </ScrollView>
      <LoadingModal visible={isLoading} />
    </SafeAreaView>
  );
};

export default VerificationScreen;

import React, { useState, useCallback, useRef } from "react";
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  StyleSheet,
  ScrollView,
  BackHandler,
} from "react-native";

import { Colors, Fonts, Sizes } from "../../constant/styles";
import { useFocusEffect } from "@react-navigation/native";
import AppText from "../../component/AppText";
import AppButton from "../../component/AppButton";
import PhoneNumberTextField from "../../component/PhoneInput";
import Logo from "../../component/Logo";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";

import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

import { auth, firebaseConfig } from "../../../firebaseConfig";

const SigninScreen = ({ navigation }) => {
  const [backClickCount, setBackClickCount] = useState(0);
  const [state, setState] = useState({
    phoneNumber: null,
  });
  const recaptchaVerifier = useRef(null);

  const backAction = () => {
    backClickCount == 1 ? BackHandler.exitApp() : _spring();
    return true;
  };
  const updateState = (data) => {
    setState((state) => ({ ...state, ...data }));
  };

  const handleSendVerificationCode = async () => {
    try {
      const validPhone = `+20${phoneNumber}`;
      const result = await signInWithPhoneNumber(
        auth,
        validPhone,
        recaptchaVerifier.current
      );
      if (result.verificationId)
        navigation.navigate("Verification", { result });
      console.log(result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      BackHandler.addEventListener("hardwareBackPress", backAction);
      return () =>
        BackHandler.removeEventListener("hardwareBackPress", backAction);
    }, [backAction])
  );

  function _spring() {
    setBackClickCount(1);
    setTimeout(() => {
      setBackClickCount(0);
    }, 1000);
  }

  const { phoneNumber } = state;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <StatusBar backgroundColor={Colors.primaryColor} />
      <View style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Logo />

          <AppText
          centered={true}
            text={"Signin with Phone Number"}
            style={{ marginBottom: 10,      
            }}
          />
          <PhoneNumberTextField
            phoneNumber={phoneNumber}
            updateState={updateState}
          />
          <View style={{ backgroundColor: "red" }}>
            <FirebaseRecaptchaVerifierModal
              ref={recaptchaVerifier}
              firebaseConfig={firebaseConfig}
            />
          </View>
          <AppButton
            path={"Verification"}
            title={"Continue"}
            disabled={phoneNumber < 10}
            onPress={() => handleSendVerificationCode()}
          />
          <AppText
            text={"We'll send OTP for Verification"}
            style={{
              marginTop: Sizes.fixPadding - 5.0,
              ...Fonts.grayColor18Medium,
            }}
          />
        </ScrollView>
      </View>
      {backClickCount == 1 ? (
        <View style={[styles.animatedView]}>
          <Text style={{ ...Fonts.whiteColor15Regular }}>
            Press back once again to exit
          </Text>
        </View>
      ) : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  animatedView: {
    backgroundColor: "#FFF",
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    borderRadius: Sizes.fixPadding * 2.0,
    paddingHorizontal: Sizes.fixPadding + 5.0,
    paddingVertical: Sizes.fixPadding,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SigninScreen;

import React, { useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constant/styles";
import Logo from "../../component/Logo";
import AppButton from "../../component/AppButton";
import ArrowBack from "../../component/ArrowBack";
import AppText from "../../component/AppText";
import { useTranslation } from "react-i18next";

const RegisterScreen = ({ navigation }) => {
  const { t } = useTranslation();

  const [state, setState] = useState({
    fullName: "",
    password: "",
    emailAddress: "",
  });

  const updateState = (data) => setState((state) => ({ ...state, ...data }));

  const { fullName, emailAddress } = state;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <StatusBar backgroundColor={Colors.primaryColor} />
      <View style={{ flex: 1 }}>
        <ArrowBack />
        <ScrollView showsVerticalScrollIndicator={false}>
          <Logo />
          <View style={{flex:1,alignItems:'center'}}>

          <AppText
            text={"Register Your Account"}
            style={{ color: Colors.primaryColor, marginBottom: 10 }}
            />
            </View>
          <AppButton path={"App"} title={"Continue"} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );

  
};

const styles = StyleSheet.create({
  continueButtonStyle: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primaryColor,
    paddingVertical: Sizes.fixPadding,
    marginHorizontal: Sizes.fixPadding,
    borderRadius: Sizes.fixPadding - 5.0,
    marginTop: Sizes.fixPadding * 4.0,
  },
  appLogoStyle: {
    width: 200.0,
    height: 200.0,
    alignSelf: "center",
    marginBottom: Sizes.fixPadding,
    marginTop: Sizes.fixPadding * 3.0,
  },
  phoneNumberTextFieldStyle: {
    borderColor: Colors.primaryColor,
    borderWidth: 1.0,
    borderRadius: Sizes.fixPadding - 5.0,
    marginHorizontal: Sizes.fixPadding,
  },
  textFieldStyle: {
    borderColor: Colors.primaryColor,
    borderWidth: 1.0,
    borderRadius: Sizes.fixPadding - 5.0,
    paddingHorizontal: Sizes.fixPadding * 2.0,
    height: 55.0,
    ...Fonts.primaryColor18Medium,
    marginHorizontal: Sizes.fixPadding,
    backgroundColor: Colors.whiteColor,
    marginBottom: 15,
  },
});

export default RegisterScreen;

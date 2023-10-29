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
          <AppText
            text={"Register Your Account"}
            style={{ color: Colors.primaryColor, marginBottom: 10 }}
          />
          {fullNameTextField()}
          {emailAddressTextField()}
          <AppButton path={"BottomTabBar"} title={"Continue"} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );

  function emailAddressTextField() {
    return (
      <TextInput
        placeholder={t("emailAddress")}
        placeholderTextColor={Colors.primaryColor}
        value={emailAddress}
        onChangeText={(text) => updateState({ emailAddress: text })}
        selectionColor={Colors.primaryColor}
        style={styles.textFieldStyle}
        keyboardType="email-address"
      />
    );
  }

  function fullNameTextField() {
    return (
      <TextInput
        placeholder={t("fullName")}
        placeholderTextColor={Colors.primaryColor}
        value={fullName}
        onChangeText={(text) => updateState({ fullName: text })}
        selectionColor={Colors.primaryColor}
        style={styles.textFieldStyle}
      />
    );
  }
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

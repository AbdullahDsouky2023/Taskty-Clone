import React, { useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  View,
  StyleSheet,
  ScrollView,
} from "react-native";
import * as yup from "yup";
import { useTranslation } from "react-i18next";

import ArrowBack from "../../component/ArrowBack";
import { Colors } from "../../constant/styles";
import AppText from "../../component/AppText";
import Logo from "../../component/Logo";
import AppForm from "../../component/Form/Form";
import ErrorMessage from "../../component/Form/ErrorMessage";
import FormField from "../../component/Form/FormField";
import SubmitButton from "../../component/Form/FormSubmitButton";

const RegisterScreen = ({ navigation }) => {
  const [error, setError] = useState();
  const { t } = useTranslation();

  const validationSchema = yup.object().shape({
    fullName: yup
      .string()
      .required(t("Full name is required"))
      .min(2, "Full Name is too short")
      .max(50, "Full Name is too long"),
    emailAddress: yup
      .string()
      .email(t("Invalid email address"))
      .required(t("Email is required")),
  });

  const handleFormSubmit = (values) => {
    console.log("Form submitted with values:", values);
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <StatusBar backgroundColor={Colors.primaryColor} />
      <View style={{ flex: 1 }}>
        <ArrowBack />
        <ScrollView showsVerticalScrollIndicator={false}>
          <Logo />
          <View style={{ flex: 1, alignItems: "center" }}>
            <AppText
              text={"Register Your Account"}
              style={{ color: Colors.primaryColor, marginBottom: 10 }}
            />
            <AppForm
              initialValues={{ fullName: "", emailAddress: "" }}
              onSubmit={(data) =>handleFormSubmit(data)}
              validationSchema={validationSchema}
            >
              <ErrorMessage error={error} visible={error} />
              <FormField
                autoCorrect={false}
                icon="account"
                name="fullName"
                placeholder="fullName"
              />
              <FormField
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                name="emailAddress"
                placeholder="emailAddress"
                textContentType="emailAddress"
              />

              <SubmitButton title="Register" />
            </AppForm>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // Your styles remain the same
});

export default RegisterScreen;

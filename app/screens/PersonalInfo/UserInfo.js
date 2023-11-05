import React, { useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  View,
  StyleSheet,
  ScrollView,
  Alert,
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
import { auth, db, fireStore } from "../../../firebaseConfig";
import {
  doc,
  setDoc,
  addDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import LoadingModal from "../../component/Loading";
import { useDispatch, useSelector } from "react-redux";
import { storeUserInfo } from "../../utils/firebase/user";
import { setItem } from "../../utils/secureStore";
const UserInfo = ({ navigation }) => {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch()
  const user = useSelector((state)=>state.user.user)

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

  const handleFormSubmit = async (values) => {
    try {
      setIsLoading(true);
      const emailExistsQuery = query(
        collection(db, "users"),
        where("emailAddress", "==", values.emailAddress)
      );

      const emailExistsSnapshot = await getDocs(emailExistsQuery);

      if (!emailExistsSnapshot.empty) {
        // Email already exists, handle the case (e.g., show an error message)
        Alert.alert(" عنوان البردي الالكتروني  مستخدم من قبل ");
      } else {
        // Email is unique, proceed to insert the document
      
      dispatch(userRegisterSuccess(auth?.currentUser));
       setItem('userData',auth?.currentUser)
        navigation.navigate("App");
        // const docRef = await addDoc(collection(db, "users"), {...,...user});
      }
    } catch (err) {
      console.log("error creating the resi", err.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <StatusBar backgroundColor={Colors.primaryColor} />
      <View style={{ flex: 1 }}>
        <ArrowBack />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ flex: 1, alignItems: "center" }}>
            <AppText
              text={"Register Your Account"}
              style={{ color: Colors.primaryColor, marginBottom: 10 }}
            />
            <AppForm
              initialValues={{ fullName: "", emailAddress: "" }}
              onSubmit={(data) => handleFormSubmit(data)}
              validationSchema={validationSchema}
            >
              <ErrorMessage error={error} visible={error} />
              <FormField
                autoCorrect={false}
                name="fullName"
                placeholder="fullName"
                value={user?.fullName }
              />
              <FormField
                autoCorrect={false}
                name="phoneNumber"
                placeholder="phoneNumber"
              />
              <FormField
                autoCorrect={false}
                name="address"
                placeholder="address"
              />
              <FormField
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                name="emailAddress"
                placeholder="emailAddress"
                textContentType="emailAddress"
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
  // Your styles remain the same
});

export default UserInfo;

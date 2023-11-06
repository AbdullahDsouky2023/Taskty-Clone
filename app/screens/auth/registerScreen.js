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
  updateDoc,
} from "firebase/firestore";
import LoadingModal from "../../component/Loading";
import { useDispatch, useSelector } from "react-redux";
import { setItem } from "../../utils/secureStore";
import { userRegisterSuccess } from "../../store/features/userSlice";
const RegisterScreen = ({ navigation }) => {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

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

  // const handleFormSubmit = async (values) => {
  //   try {
  //     const usersRef = collection(db, "users");
  //     setIsLoading(true);
  
  //     const emailExistsQuery = query(
  //       collection(db, "users"),
  //       where("emailAddress", "==", values.emailAddress)
  //     );
  
  //     const emailExistsSnapshot = await getDocs(emailExistsQuery);
  
  //     if (!emailExistsSnapshot.empty) {
  //       // Email already exists, handle the case (e.g., show an error message)
  //       Alert.alert(" عنوان البردي الالكتروني  مستخدم من قبل ");
  //     } else {
  //       // Email is unique, proceed to insert the document
  
  //       dispatch(userRegisterSuccess(auth?.currentUser));
  //       setItem("userData", auth?.currentUser);
  

  //         const phone = auth.currentUser.phoneNumber;
  
  //         const phoneNumberQuery = query(
  //           usersRef,
  //           where("phoneNumber", "==", phone)
  //         );
  //         const querySnapshot = await getDocs(phoneNumberQuery);
  
  //         if (!querySnapshot.empty && values) {
  //           // Get the reference to the document you want to update
  //           const userDocRef = doc(usersRef, phone);
  //           // Update the document with new values
  //           await updateDoc(userDocRef, values);
  //           console.log("User data updated in Firestore");
  //           navigation.navigate("App");
  //         }
        
  //     }
  //   } catch (err) {
  //     console.log("error creating the resi", err.message);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  const handleFormSubmit = async (values) => {
    try {
      const usersRef = collection(db, "users");
      setIsLoading(true);
  
      // Check if the user's document exists
      const userDocQuery = query(
        usersRef,
        where("phoneNumber", "==", auth.currentUser.phoneNumber)
      );
      const userDocSnapshot = await getDocs(userDocQuery);
  
      if (!userDocSnapshot.empty) {
        // User document exists, retrieve existing data
        const userDocData = userDocSnapshot.docs[0].data();
  
        // Update only the necessary fields (full name and email)
        const updatedUserData = {
          fullName: values.fullName || userDocData.fullName,
          emailAddress: values.emailAddress || userDocData.emailAddress,
        };
  
        // Update the document with new values
        const userDocRef = userDocSnapshot.docs[0].ref;
        await updateDoc(userDocRef, updatedUserData);
      } else {
        // User document does not exist, proceed with inserting a new document
        const userData = {
          fullName: values.fullName,
          emailAddress: values.emailAddress,
          phoneNumber: auth.currentUser.phoneNumber,
        };
  
        await setDoc(doc(usersRef, auth.currentUser.phoneNumber), userData);
      }
  
      dispatch(userRegisterSuccess(auth?.currentUser));
      setItem("userData", auth?.currentUser);
  
      navigation.navigate("App");
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
          <Logo />
          <View style={{ flex: 1, alignItems: "center" }}>
            <AppText
              text={"Register Your Account"}
              style={{ color: Colors.primaryColor, marginBottom: 10 }}
            />
            <AppForm
              initialValues={{ fullName: "", emailAddress: "" }}
              onSubmit={handleFormSubmit}
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
        <LoadingModal visible={isLoading} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // Your styles remain the same
});

export default RegisterScreen;

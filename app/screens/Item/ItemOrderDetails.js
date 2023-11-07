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
import FormDatePicker from "../../component/Form/FormDatePicker";
import FormTimePicker from "../../component/Form/FormTimePicker";

export default function ItemOrderDetails({ route, navigation }) {
  const { item } = route.params;
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const handleFormSubmit = (values) => {
    console.log("form submit", values);
  };
  const validationSchema = yup.object().shape({
    date: yup.date().required("Date is required"),
    time: yup.string().required("Time is required"),
    description: yup.string().required("Description is required"),
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <StatusBar backgroundColor={Colors.primaryColor} />
      <View style={{ flex: 1 }}>
        <ArrowBack />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ flex: 1, alignItems: "center" }}>
            <AppText
              text={item.attributes.name}
              style={{
                color: Colors.primaryColor,
                marginBottom: 10,
                fontSize: 15,
              }}
            />
            <AppForm
            enableReinitialize={true} // Add this prop
              initialValues={{ date: "", time: "", description: "" }}
              onSubmit={(values) => handleFormSubmit(values)}
              validationSchema={validationSchema}
            >
              <ErrorMessage error={error} visible={error} />
              <AppText
                text={"يوم التنفيذ"}
                centered={false}
                style={styles.label}
              />
              <FormDatePicker placeholder="Date" />
              <AppText
                text={"وقت التنفيذ"}
                centered={false}
                style={styles.label}
              />
              <FormTimePicker placeholder="Date" />
              <AppText
                text={"معلومات  اخري"}
                centered={false}
                style={styles.label}
              />
              <FormField
                autoCapitalize="none"
                autoCorrect={false}
                name="description" // Make sure the name matches the field in the form values
                placeholder="description"
                multiline={true}
                numberOfLines={4}
                // ... other props
              />

              <SubmitButton title="Register" />
            </AppForm>
          </View>
        </ScrollView>
        <LoadingModal visible={isLoading} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  label: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    color: Colors.blackColor,
  },
});

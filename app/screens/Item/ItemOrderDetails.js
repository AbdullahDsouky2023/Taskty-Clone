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
import ReserveButton from "../../component/ReverveButton";
import { format } from "date-fns";
import { arDZ } from "date-fns/locale";
import SuccessModel from "../../component/SuccessModal";

export default function ItemOrderDetails({ route, navigation }) {
  const { item } = route.params;
  const [error, setError] = useState();
  const [showSuccess, setShowSuccess] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const handleFormSubmit = (values) => {
    try {
      // Create valid Date objects
      const date = new Date(values.Date);
      const time = new Date(values.Time);
  
      // Format the date and time
      const formattedDate = format(date, "dd MMMM yyyy", {
        locale: arDZ,
      });
      const formattedTime = format(time, "hh:mm a", {
        locale: arDZ,
      });
      setShowSuccess(true)
      console.log("Form submit", {
        Date: formattedDate,
        Time: formattedTime,
        description: values.description,
      });
    } catch (error) {
      console.error("Error parsing date or time:", error);
    }
  };
  

  const validationSchema = yup.object().shape({
    Date: yup.date().required("من فضلك اختار يوم التنفيذ"),
    Time: yup.string().required("من فضلك اختار وقت التنفيذ"),
    description: yup.string()
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
              enableReinitialize={true}
              initialValues={{ Date: "", Time: "", description: "" }}
              onSubmit={handleFormSubmit}
              validationSchema={validationSchema}
            >
              <ErrorMessage error={error} visible={error} />
              <AppText
                text={"يوم التنفيذ"}
                centered={false}
                style={styles.label}
              />
              <FormDatePicker name="Date" placeholder="Date"  />
              <AppText
                text={"وقت التنفيذ"}
                centered={false}
                style={styles.label}
              />
              <FormTimePicker name="Time" placeholder="Time" />
              <AppText
                text={"معلومات  اخري"}
                centered={false}
                style={styles.label}
              />
              <FormField
                autoCapitalize="none"
                autoCorrect={false}
                name="description" // Make sure the name matches the field in the form values
                // placeholder="description"
                multiline={true}
                numberOfLines={4}
                textAlignVertical="top" // Add this line

                // ... other props
              />
              <SubmitButton title={"Book"}/>
            </AppForm>
          </View>
        </ScrollView>

        <SuccessModel visible={showSuccess} onPress={()=>setShowSuccess(false)}/>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  label: {
    paddingHorizontal: 15,
    paddingVertical: 4,
    color: Colors.blackColor,
  },
});

import React, { useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import * as yup from "yup";
import { format } from "date-fns";
import { arDZ } from "date-fns/locale";
import {  useSelector } from "react-redux";

import ArrowBack from "../../component/ArrowBack";
import { Colors } from "../../constant/styles";
import AppText from "../../component/AppText";
import AppForm from "../../component/Form/Form";
import ErrorMessage from "../../component/Form/ErrorMessage";
import FormField from "../../component/Form/FormField";

import FormDatePicker from "../../component/Form/FormDatePicker";
import SubmitButton from "../../component/Form/FormSubmitButton";
import FormTimePicker from "../../component/Form/FormTimePicker";
import SuccessModel from "../../component/SuccessModal";
import FormImagePicker from "../../component/Form/FormImagePicker";
import { postOrder } from "../../../utils/orders";
import { ORDER_SUCCESS_SCREEN } from "../../navigation/routes";

const { width } = Dimensions.get("window");

export default function ItemOrderDetails({ route, navigation }) {
  const { item } = route.params;
  const [error, setError] = useState();
  const [showSuccess, setShowSuccess] = useState(false);

  const user = useSelector((state) => state.user.user);

  const handleFormSubmit = async (values) => {
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

      const formSubmitionData = {
        date: formattedDate.toString(),
        time: formattedTime.toString(),
        description: values.description,
        // images: imageData,
        service: item.id,
        location: "Benisuif",
        phoneNumber: user.phoneNumber,
      };

      const data = await postOrder({
        "data":formSubmitionData,
        "images.media":values.image
      }
        );
      if (data) {
        navigation.navigate(ORDER_SUCCESS_SCREEN);
      }
    } catch (error) {
      console.error("Error parsing date or time:", error);
    }
  };

  const validationSchema = yup.object().shape({
    Date: yup.date().required("من فضلك اختار يوم التنفيذ"),
    Time: yup.string().required("من فضلك اختار وقت التنفيذ"),
    description: yup.string(),
  });

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.bodyBackColor,
        position: "relative",
        height: "100%",
      }}
    >
      <StatusBar backgroundColor={Colors.primaryColor} />
      <View style={{ flex: 1, paddingBottom: 100 }}>
        <ArrowBack />
        <AppForm
          enableReinitialize={true}
          initialValues={{ Date: "", Time: "", description: "", image: null }}
          onSubmit={handleFormSubmit}
          validationSchema={validationSchema}
        >
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
              <ErrorMessage error={error} visible={error} />
              <AppText
                text={"يوم التنفيذ"}
                centered={false}
                style={styles.label}
              />
              <FormDatePicker name="Date" placeholder="Date" />
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
              <AppText
                text={"اختيار صورة"}
                centered={false}
                style={styles.label}
              />
              <FormImagePicker name="image" width={width} />
            </View>
          </ScrollView>
          <View style={styles.orderButtonContainer}>
            <AppText
              text={item.attributes.Price}
              style={{ color: Colors.blackColor }}
            />
            <SubmitButton title={"Book"} style={styles.buttonSubmit} />
          </View>
        </AppForm>

        <SuccessModel
          visible={showSuccess}
          onPress={() => setShowSuccess(false)}
        />
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
  orderButtonContainer: {
    height: 100,
    position: "absolute",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.grayColor,
    borderRadius: 20,
    width: width,
    bottom: 0,
    right: 0,
    paddingHorizontal: 20,
  },
  buttonSubmit: {
    width: width * 0.3,
    marginTop: 10,
  },
});

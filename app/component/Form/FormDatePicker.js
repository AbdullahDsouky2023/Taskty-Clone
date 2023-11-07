import React, { useState } from "react";
import { useFormikContext } from "formik";
import FormTextInput from "./FormInput";
import ErrorMessage from "./ErrorMessage";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Button, Dimensions, StyleSheet, Text } from "react-native";
import { View } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("screen");

function FormDatePicker({ name, ...otherProps }) {
  const { setFieldTouched, setFieldValue, errors, touched, values } = useFormikContext();
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios"); // Hide the DateTimePicker for iOS
    setDate(currentDate);
    setFieldValue(name, currentDate); // Set the field value here
    setFieldTouched(name, true); // Mark the field as touched
  };

  const showDatepicker = () => {
    setShow(true);
  };

  return (
    <>
      <TouchableOpacity onPress={showDatepicker}>
        <View style={styles.date}>
          <TextInput
            value={values[name] ? values[name].toDateString() : ""}
            editable={false}
          />
          <MaterialCommunityIcons name="calendar-clock-outline" size={24} color="black" />
        </View>
      </TouchableOpacity>
      <ErrorMessage error={errors[name]} visible={touched[name]} />
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </>
  );
}

export default FormDatePicker;

const styles = StyleSheet.create({
  date: {
    borderWidth: 1,
    width: width * 0.93,
    padding: 10,
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

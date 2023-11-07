import React, { useState } from "react";
import { useFormikContext } from "formik";
import FormTextInput from "./FormInput";
import ErrorMessage from "./ErrorMessage";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button, Dimensions, StyleSheet, Text, TextInput } from "react-native";
import { View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from '@expo/vector-icons';
const { width } = Dimensions.get('screen');

function FormTimePicker({ name, ...otherProps }) {
  const {
    setFieldTouched,
    setFieldValue,
    errors,
    touched,
    values,
  } = useFormikContext();
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('time');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios'); // Hide the DateTimePicker for iOS
    setDate(currentDate);
    setFieldValue(name, currentDate);
    setFieldTouched(name, true); // Mark the field as touched
  };

  const showTimepicker = () => {
    setShow(true);
  };

  return (
    <>
      <TouchableOpacity onPress={showTimepicker}>
        <View style={styles.date}>
          <TextInput
            value={date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
            editable={false}
          />
          <Ionicons name="timer-outline" size={24} color="black" />
        </View>
      </TouchableOpacity>
      <ErrorMessage error={errors[name]} visible={touched[name]} />
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </>
  );
}

export default FormTimePicker;

const styles = StyleSheet.create({
  date: {
    borderWidth: 1,
    width: width * 0.93,
    padding: 10,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

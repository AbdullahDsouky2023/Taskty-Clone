import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import AppText from "./AppText";
import { StyleSheet } from "react-native";
import { Colors, Sizes, Fonts } from "../constant/styles";
import { useNavigation } from "@react-navigation/native";

export default function AppButton({
  path,
  title,
  style,
  textStyle,
  onPress,
  disabled = false,
}) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={onPress}
      disabled={disabled}
      style={[
        disabled ? styles.disabledStyle : styles.continueButtonStyle,
        style,
      ]}
    >
      <AppText
        text={title}
        style={{ ...Fonts.whiteColor19Medium, ...textStyle }}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  continueButtonStyle: {
    alignItems: "center",
    justifyContent: "center",
    width: "auto",
    paddingVertical: Sizes.fixPadding,
    marginHorizontal: Sizes.fixPadding,
    borderRadius: Sizes.fixPadding - 5.0,
    marginTop: Sizes.fixPadding * 4.0,
    paddingHorizontal: Sizes.fixPadding * 2.5,
    borderRadius: 40,
    backgroundColor: Colors.primaryColor,
  },
  disabledStyle: {
    backgroundColor: Colors.grayColor,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "auto",
    paddingVertical: Sizes.fixPadding,
    marginHorizontal: Sizes.fixPadding,
    borderRadius: Sizes.fixPadding - 5.0,
    marginTop: Sizes.fixPadding * 4.0,
    paddingHorizontal: Sizes.fixPadding * 2.5,
    borderRadius: 40,
  },
});

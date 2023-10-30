import React from "react";
import IntlPhoneInput from "react-native-intl-phone-input";
import { I18nManager, StyleSheet } from "react-native";

import { Sizes, Fonts, Colors } from "../constant/styles";
I18nManager.forceRTL(false);
I18nManager.allowRTL(false);

export default function PhoneNumberTextField({ phoneNumber, updateState }) {
  return (
    <IntlPhoneInput
    
      onChangeText={({ phoneNumber }) => {
        updateState({ phoneNumber: phoneNumber });
      }}
      
      defaultCountry="EG"
      containerStyle={styles.phoneNumberTextFieldStyle}
      dialCodeTextStyle={{
        ...Fonts.blackColor17Medium,
        marginLeft: Sizes.fixPadding - 5.0,
      }}
      phoneInputStyle={{
        flex: 1,
        marginLeft: Sizes.fixPadding,
        ...Fonts.blackColor17Medium,
        // direction: "ltr",
    textAlign: "left",
      }}
      placeholder="رقم الهاتف"
    />
  );
}
const styles = StyleSheet.create({
  phoneNumberTextFieldStyle: {
    borderColor: Colors.primaryColor,
    borderWidth: 1.0,
    borderRadius: Sizes.fixPadding - 5.0,
    marginHorizontal: Sizes.fixPadding,
  direction:'ltr'
  },
});

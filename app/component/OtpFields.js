import OTPTextView from "react-native-otp-textinput";
import { useNavigation } from "@react-navigation/native";

import { Sizes ,Colors,Fonts,} from "../constant/styles";
import { StyleSheet } from "react-native";
import { useState } from "react";

export default function OtpFields({setisLoading}) {
    const navigation = useNavigation()
    const [otpInput, setotpInput] = useState("");

    return (
      <OTPTextView
        containerStyle={{
          marginTop: Sizes.fixPadding * 2.0,
          marginHorizontal: Sizes.fixPadding * 2.0,
        }}
        handleTextChange={(text) => {
          setotpInput(text);
          console.log(text)
          if (otpInput.length == 3) {
            setisLoading(true);
            setTimeout(() => {
              setisLoading(false);
              console.log(otpInput)
              navigation.push("Register");
            }, 2000);
          }
        }}
        inputCount={4}
        keyboardType="numeric"
        tintColor={Colors.primaryColor}
        offTintColor={Colors.bgColor}
        textInputStyle={styles.textFieldStyle }
      />
    );
  }

  const styles = StyleSheet.create({
    textFieldStyle: {
        borderBottomWidth: null,
        borderRadius: Sizes.fixPadding - 5.0,
        backgroundColor: Colors.whiteColor,
        borderColor: Colors.primaryColor,
        borderWidth: 1.0,
        // ...Fonts.primaryColor18Medium,
        // padding:34,
        width:65,
        height:65,
        fontSize:22
    
      },
  })
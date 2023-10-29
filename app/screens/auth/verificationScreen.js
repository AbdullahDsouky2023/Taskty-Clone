import React, { useState } from "react";
import { View, SafeAreaView, StatusBar, ScrollView } from "react-native";

import { Colors } from "../../constant/styles";
import ArrowBack from "../../component/ArrowBack";
import AppButton from "../../component/AppButton";
import AppText from "../../component/AppText";
import LoadingModal from "../../component/Loading";
import OtpFields from "../../component/OtpFields";
import Timer from "../../component/Timer";

const VerificationScreen = ({ navigation }) => {
  const [isLoading, setisLoading] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <StatusBar backgroundColor={Colors.primaryColor} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <ArrowBack />
        <View>
          <AppText
            text={"verification"}
            style={{
              fontSize: 28,
              color: Colors.primaryColor,
              textAlign: "left",
              paddingRight: 42,
              marginBottom: 10,
            }}
          />
          <AppText text={"enterOTPCode"} />
          <OtpFields setisLoading={setisLoading} />
          <AppButton title={"Continue"} path={"Register"} />

          <AppText
            text={"didntReceiveOTP"}
            style={{
              margin: 18,
            }}
          />
          <Timer />
        </View>
      </ScrollView>
      <LoadingModal visible={isLoading} />
    </SafeAreaView>
  );
};

export default VerificationScreen;

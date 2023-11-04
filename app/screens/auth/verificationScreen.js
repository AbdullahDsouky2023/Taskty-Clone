import React, { useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Alert,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Colors } from "../../constant/styles";
import ArrowBack from "../../component/ArrowBack";
import AppButton from "../../component/AppButton";
import AppText from "../../component/AppText";
import LoadingModal from "../../component/Loading";
import OtpFields from "../../component/OtpFields";
import { errorMessages } from "../../data/signin";
import { userRegisterSuccess } from "../../store/features/userSlice";
import { auth } from "../../../firebaseConfig";
import { changeUserInfo } from "../../utils/firebase/user";

const { width } = Dimensions.get("screen");

const VerificationScreen = ({ navigation, route }) => {
  const [isLoading, setisLoading] = useState(false);
  const [otpInput, setOtpInput] = useState("");
  const [resendDisabled, setResendDisabled] = useState(true);
  const [secondsRemaining, setSecondsRemaining] = useState(60);
  const dispatch = useDispatch();

  const { result, handleSendVerificationCode } = route.params;

  const confirmVerificationCode = async () => {
    try {
      const res = await result.confirm(otpInput);
      setResendDisabled(true);
      setSecondsRemaining(60);

      dispatch(userRegisterSuccess(auth?.currentUser));
      await AsyncStorage.setItem("userData", JSON.stringify(auth?.currentUser));

      await changeUserInfo()

      //if existt navigate to app
      if (!auth?.currentUser.providerData[0].displayName) {
        navigation.navigate("Register");
      } else {
        // if not navigate to

        navigation.navigate("App");
      }
    } catch (error) {
      const errorMessage = errorMessages[error.message];
      Alert.alert(
        errorMessage || "حدث خطأ غير معروف. الرجاء المحاولة مرة أخرى"
      );
    } finally {
      setOtpInput("");
    }
  };

  useEffect(() => {
    if (resendDisabled) {
      const timer = setInterval(() => {
        if (secondsRemaining > 0) {
          setSecondsRemaining(secondsRemaining - 1);
        } else {
          setResendDisabled(false); // Enable the "Resend SMS" button
          clearInterval(timer);
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [resendDisabled, secondsRemaining]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <StatusBar backgroundColor={Colors.primaryColor} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <ArrowBack />
        <View>
          <View style={styles.textContainer}>
            <AppText
              text={"verification"}
              style={{
                fontSize: 28,
                color: Colors.primaryColor,
                marginBottom: 10,
              }}
              centered={false}
            />
            <AppText
              text={"enterOTPCode"}
              centered={false}
              style={{ fontSize: 17 }}
            />
          </View>
          <OtpFields
            setisLoading={setisLoading}
            setOtpInput={setOtpInput}
            otpInput={otpInput}
            confirmVerificationCode={(otpInput) =>
              confirmVerificationCode(otpInput)
            }
          />
          <AppButton
            title={"Continue"}
            path={"Register"}
            // disabled={otpInput.length === 6 }
            onPress={confirmVerificationCode}
          />
          <View style={styles.sendMessasesContainer}>
            <AppText
              text={"didntReceiveOTP"}
              style={{
                fontSize: 18,
                paddingTop: 44,
                paddingRight: 20,
              }}
              centered={false}
            />
            <AppButton
              title={
                resendDisabled ? ` ارسال(${secondsRemaining}s)` : "ارسال SMS"
              }
              disabled={resendDisabled}
              onPress={() => {
                setResendDisabled(true);
                setSecondsRemaining(60);
                handleSendVerificationCode();
              }}
            />
          </View>
        </View>
      </ScrollView>
      <LoadingModal visible={isLoading} />
    </SafeAreaView>
  );
};

export default VerificationScreen;
const styles = StyleSheet.create({
  textContainer: {
    flex: 1,
    alignItems: "flex-start",
    marginTop: 10,
    paddingHorizontal: 25,
  },
  sendMessasesContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: 10,
    // marginRight: 25,
    justifyContent: "space-between",
    flexDirection: "row",
  },
});

import React, { useState, useCallback } from "react";
import { SafeAreaView, StatusBar, View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, BackHandler } from "react-native";
import { Colors, Fonts, Sizes } from "../../constant/styles";
import IntlPhoneInput from 'react-native-intl-phone-input';
import { useFocusEffect } from "@react-navigation/native";

const SigninScreen = ({ navigation }) => {

    const backAction = () => {
        backClickCount == 1 ? BackHandler.exitApp() : _spring();
        return true;
    }

    useFocusEffect(
        useCallback(() => {
            BackHandler.addEventListener("hardwareBackPress", backAction);
            return () => BackHandler.removeEventListener("hardwareBackPress", backAction);
        }, [backAction])
    );

    function _spring() {
        setBackClickCount(1);
        setTimeout(() => {
            setBackClickCount(0)
        }, 1000)
    }

    const [backClickCount, setBackClickCount] = useState(0);

    const [state, setState] = useState({
        phoneNumber: null,
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const {
        phoneNumber,
    } = state;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1, }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {appLogo()}
                    {signinText()}
                    {phoneNumberTextField()}
                    {continueButton()}
                    {otpInfo()}
                </ScrollView>
            </View>
            {
                backClickCount == 1
                    ?
                    <View style={[styles.animatedView]}>
                        <Text style={{ ...Fonts.whiteColor15Regular }}>
                            Press back once again to exit
                        </Text>
                    </View>
                    :
                    null
            }
        </SafeAreaView>
    )

    function signinText() {
        return (
            <Text style={{ marginBottom: Sizes.fixPadding + 5.0, ...Fonts.grayColor18Medium, textAlign: 'center' }}>
                Signin with Phone Number
            </Text>
        )
    }

    function otpInfo() {
        return (
            <Text style={{ marginTop: Sizes.fixPadding - 5.0, ...Fonts.grayColor18Medium, textAlign: 'center' }}>
                We'll send OTP for Verification.
            </Text>
        )
    }

    function continueButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => navigation.push('Register')}
                style={styles.continueButtonStyle}>
                <Text style={{ ...Fonts.whiteColor19Medium }}>
                    Continue
                </Text>
            </TouchableOpacity>
        )
    }

    function phoneNumberTextField() {
        return (
            <IntlPhoneInput
                onChangeText={({ phoneNumber }) => { updateState({ phoneNumber: phoneNumber }) }}
                defaultCountry="IN"
                containerStyle={styles.phoneNumberTextFieldStyle}
                dialCodeTextStyle={{ ...Fonts.blackColor17Medium, marginLeft: Sizes.fixPadding - 5.0, }}
                phoneInputStyle={{
                    flex: 1,
                    marginLeft: Sizes.fixPadding,
                    ...Fonts.blackColor17Medium,
                }}
                placeholder="PhoneNumber"
            />
        )
    }

    function appLogo() {
        return (
            <Image
                source={require('../../assets/images/transparent-icon.png')}
                style={styles.appLogoStyle}
                resizeMode="contain"
            />
        )
    }
}

const styles = StyleSheet.create({
    animatedView: {
        backgroundColor: '#333333',
        position: "absolute",
        bottom: 20,
        alignSelf: 'center',
        borderRadius: Sizes.fixPadding * 2.0,
        paddingHorizontal: Sizes.fixPadding + 5.0,
        paddingVertical: Sizes.fixPadding,
        justifyContent: "center",
        alignItems: "center",
    },
    continueButtonStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primaryColor,
        paddingVertical: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding,
        borderRadius: Sizes.fixPadding - 5.0,
        marginTop: Sizes.fixPadding * 4.0,
    },
    appLogoStyle: {
        width: 200.0,
        height: 200.0,
        alignSelf: 'center',
        marginBottom: Sizes.fixPadding * 4.0,
        marginTop: Sizes.fixPadding * 8.0
    },
    phoneNumberTextFieldStyle: {
        borderColor: 'rgba(0, 150, 136, 0.3)',
        borderWidth: 1.0,
        borderRadius: Sizes.fixPadding - 5.0,
        marginHorizontal: Sizes.fixPadding
    }
})

export default SigninScreen;
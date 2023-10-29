
import React, { useState } from "react";
import { SafeAreaView, StatusBar, View, Text, StyleSheet, TextInput, ScrollView, Image, TouchableOpacity } from "react-native";
import { Colors, Fonts, Sizes } from "../../constant/styles";
import { MaterialIcons } from '@expo/vector-icons';

const RegisterScreen = ({ navigation }) => {

    const [state, setState] = useState({
        fullName: '',
        password: '',
        emailAddress: '',
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const {
        fullName,
        password,
        emailAddress,
    } = state;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1, }}>
                {backArrow()}
                <ScrollView showsVerticalScrollIndicator={false}>
                    {appLogo()}
                    {registerText()}
                    {fullNameTextField()}
                    {passwordTextField()}
                    {emailAddressTextField()}
                    {continueButton()}
                </ScrollView>
            </View>
        </SafeAreaView>
    )

    function backArrow() {
        return (
            <MaterialIcons
                name="arrow-back"
                size={24}
                color="black"
                style={{
                    marginHorizontal: Sizes.fixPadding * 2.0,
                    marginTop: Sizes.fixPadding * 2.0,
                }}
                onPress={() => navigation.pop()}
            />
        )
    }

    function emailAddressTextField() {
        return (
            <TextInput
                placeholder="Email Address"
                placeholderTextColor={Colors.primaryColor}
                value={emailAddress}
                onChangeText={(text) => updateState({ emailAddress: text })}
                selectionColor={Colors.primaryColor}
                style={styles.textFieldStyle}
                keyboardType="email-address"
            />
        )
    }

    function passwordTextField() {
        return (
            <TextInput
                placeholder="Password"
                placeholderTextColor={Colors.primaryColor}
                value={password}
                onChangeText={(text) => updateState({ password: text })}
                secureTextEntry={true}
                selectionColor={Colors.primaryColor}
                style={{ ...styles.textFieldStyle, marginVertical: Sizes.fixPadding * 2.0, }}
            />
        )
    }

    function fullNameTextField() {
        return (
            <TextInput
                placeholder="Full Name"
                placeholderTextColor={Colors.primaryColor}
                value={fullName}
                onChangeText={(text) => updateState({ fullName: text })}
                selectionColor={Colors.primaryColor}
                style={styles.textFieldStyle}
            />
        )
    }

    function registerText() {
        return (
            <Text style={{ marginBottom: Sizes.fixPadding + 10.0, ...Fonts.primaryColor18Medium, textAlign: 'center' }}>
                Register your account
            </Text>
        )
    }

    function continueButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => navigation.push('Verification')}
                style={styles.continueButtonStyle}>
                <Text style={{ ...Fonts.whiteColor19Medium }}>
                    Continue
                </Text>
            </TouchableOpacity>
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
        marginBottom: Sizes.fixPadding,
        marginTop: Sizes.fixPadding * 3.0
    },
    phoneNumberTextFieldStyle: {
        borderColor: 'rgba(0, 150, 136, 0.3)',
        borderWidth: 1.0,
        borderRadius: Sizes.fixPadding - 5.0,
        marginHorizontal: Sizes.fixPadding
    },
    textFieldStyle: {
        borderColor: 'rgba(0, 150, 136, 0.3)',
        borderWidth: 1.0,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        height: 55.0,
        ...Fonts.primaryColor18Medium,
        marginHorizontal: Sizes.fixPadding,
        backgroundColor: Colors.whiteColor,
    }
})

export default RegisterScreen;
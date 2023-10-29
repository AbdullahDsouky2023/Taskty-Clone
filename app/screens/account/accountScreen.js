import React, { useState } from "react";
import { SafeAreaView, StatusBar, View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { Colors, Fonts, Sizes } from "../../constant/styles";
import { TextInput } from 'react-native-paper';
import Dialog from "react-native-dialog";

const { width } = Dimensions.get('screen');

const AccountScreen = ({ navigation }) => {

    const [state, setState] = useState({
        mobileNumber: '123456789',
        name: '',
        logout: false,
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const {
        mobileNumber,
        name,
        logout,
    } = state;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                {nameAndMobileNumberInfo()}
                {activeOrderButton()}
                {logoutButton()}
                {logoutDialog()}
            </View>
        </SafeAreaView>
    )

    function logoutDialog() {
        return (
            <Dialog.Container
                visible={logout}
                contentStyle={styles.logoutDialogWrapStyle}
                headerStyle={{ margin: 0.0 }}
            >
                <Text style={{
                    ...Fonts.blackColor19Medium,
                    paddingTop: Sizes.fixPadding - 5.0,
                    paddingBottom: Sizes.fixPadding + 10.0
                }}>
                    Are You sure want to logout?
                </Text>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginHorizontal: Sizes.fixPadding * 2.0,
                }}>
                    <TouchableOpacity
                        activeOpacity={0.6}
                        onPress={() => updateState({ logout: false })}
                        style={styles.cancelButtonStyle}>
                        <Text style={{ ...Fonts.primaryColor18Medium }}>
                            Cancel
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.6}
                        onPress={() => {
                            updateState({ logout: false })
                            navigation.push('SignIn')
                        }}
                        style={styles.dialogLogoutButtonStyle}>
                        <Text style={{ ...Fonts.whiteColor18Medium }}>
                            Logout
                        </Text>
                    </TouchableOpacity>
                </View>
            </Dialog.Container>
        )
    }

    function logoutButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => updateState({ logout: true })}
                style={styles.logoutButtonStyle}>
                <Text style={{ ...Fonts.primaryColor19Medium }}>
                    Logout
                </Text>
            </TouchableOpacity>
        )
    }

    function activeOrderButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => navigation.push('ActiveOrdersScreen')}
                style={styles.activeOrderButtonStyle}>
                <Text style={{ ...Fonts.whiteColor19Medium }}>
                    Active Orders
                </Text>
            </TouchableOpacity>
        )
    }

    function nameAndMobileNumberInfo() {
        return (
            <View style={{
                backgroundColor: Colors.whiteColor,
                paddingVertical: Sizes.fixPadding * 2.0,
            }}>
                {nameTextField()}
                {mobileNumberTextField()}
            </View>
        )
    }

    function mobileNumberTextField() {
        return (
            <TextInput
                label="Mobile Number"
                value={mobileNumber}
                onChangeText={(text) => updateState({ mobileNumber: text })}
                mode="outlined"
                style={{
                    height: 60.0,
                    ...Fonts.primaryColor17Medium,
                    backgroundColor: Colors.whiteColor,
                    marginHorizontal: Sizes.fixPadding * 2.0,
                }}
                outlineColor={Colors.grayColor}
                selectionColor={Colors.primaryColor}
                theme={{ colors: { primary: Colors.primaryColor, underlineColor: '#C5C5C5', } }}
                keyboardType="phone-pad"
            />
        )
    }

    function nameTextField() {
        return (
            <TextInput
                label="Name"
                mode="outlined"
                value={name}
                onChangeText={(text) => updateState({ name: text })}
                style={{
                    height: 60.0,
                    ...Fonts.primaryColor17Medium,
                    backgroundColor: Colors.whiteColor,
                    marginHorizontal: Sizes.fixPadding * 2.0,
                    marginBottom: Sizes.fixPadding,
                }}
                outlineColor={Colors.grayColor}
                selectionColor={Colors.primaryColor}
                theme={{ colors: { primary: Colors.primaryColor, underlineColor: '#C5C5C5', } }}
            />
        )
    }

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <Text style={{ ...Fonts.whiteColor19Medium }}>
                    Complete Your Profile
                </Text>
                <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => navigation.navigate('Home')}
                >
                    <Text style={{ ...Fonts.whiteColor16Regular }}>
                        Save
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerWrapStyle: {
        backgroundColor: Colors.primaryColor,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 56.0,
        paddingHorizontal: Sizes.fixPadding * 2.0,
    },
    activeOrderButtonStyle: {
        backgroundColor: Colors.primaryColor,
        paddingVertical: Sizes.fixPadding,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Sizes.fixPadding,
        margin: Sizes.fixPadding * 2.0,
    },
    logoutButtonStyle: {
        backgroundColor: Colors.whiteColor,
        borderColor: Colors.primaryColor,
        borderWidth: 1.0,
        borderRadius: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding * 2.0,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: Sizes.fixPadding * 2.0,
    },
    cancelButtonStyle: {
        backgroundColor: '#E0E0E0',
        borderRadius: Sizes.fixPadding - 5.0,
        paddingVertical: Sizes.fixPadding - 5.0,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1.0,
        marginRight: Sizes.fixPadding,
    },
    dialogLogoutButtonStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingVertical: Sizes.fixPadding - 5.0,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1.0,
        marginLeft: Sizes.fixPadding,
    },
    logoutDialogWrapStyle: {
        width: width - 80.0,
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding,
        alignItems: 'center',
        paddingBottom: Sizes.fixPadding * 2.0
    },
    animatedView: {
        backgroundColor: "#333333",
        position: "absolute",
        bottom: 0,
        alignSelf: 'center',
        borderRadius: Sizes.fixPadding + 5.0,
        paddingHorizontal: Sizes.fixPadding + 5.0,
        paddingVertical: Sizes.fixPadding,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default AccountScreen;
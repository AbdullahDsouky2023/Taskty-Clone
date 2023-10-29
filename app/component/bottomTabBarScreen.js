import React, { useState, useCallback } from "react";
import { BackHandler, View, Text, StyleSheet } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Sizes, Fonts } from "../constant/styles";
import HomeScreen from "../screens/home/homeScreen";
import HealthcareScreen from "../screens/healthcare/healthcareScreen";
import NotificationScreen from "../screens/notifications/notificationScreen";
import AccountScreen from "../screens/account/accountScreen";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useFocusEffect } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

const BottomTabBar = () => {

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

    return (
        <>
            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                    tabBarActiveTintColor: Colors.primaryColor,
                    tabBarInactiveTintColor: Colors.grayColor,
                    tabBarLabelStyle: {
                        fontSize: 14.0,
                        fontFamily: 'Mukta_Regular',
                    },
                    tabBarStyle: { ...styles.tabBarStyle, },
                }}
            >
                <Tab.Screen
                    name={'Home'}
                    component={HomeScreen}
                    options={{
                        tabBarIcon: ({ color }) => <MaterialIcons name="home" size={27} color={color} />
                    }}
                />
                <Tab.Screen
                    name={'HealthCare'}
                    component={HealthcareScreen}
                    options={{
                        tabBarIcon: ({ color }) => <MaterialIcons name="tag-faces" size={27} color={color} />
                    }}
                />
                <Tab.Screen
                    name={'Notifications'}
                    component={NotificationScreen}
                    options={{
                        tabBarIcon: ({ color }) => <MaterialIcons name="notifications" size={27} color={color} />
                    }}
                />
                <Tab.Screen
                    name={'Account'}
                    component={AccountScreen}
                    options={{
                        tabBarIcon: ({ color, }) => (
                            <MaterialIcons name="person" size={27} color={color} />
                        ),
                    }}
                />
            </Tab.Navigator>
            {exitInfo()}
        </>
    )

    function exitInfo() {
        return (
            backClickCount == 1
                ?
                <View style={[styles.animatedView]}>
                    <Text style={{ ...Fonts.whiteColor15Regular }}>
                        Press back once again to exit
                    </Text>
                </View>
                :
                null
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
    tabBarStyle: {
        height: 70.0,
        elevation: 3.0,
        borderTopColor: 'gray',
        borderTopWidth: 0.20,
        borderTopLeftRadius: Sizes.fixPadding + 10.0,
        borderTopRightRadius: Sizes.fixPadding + 10.0,
        paddingTop: Sizes.fixPadding - 5.0,
        paddingBottom: Sizes.fixPadding - 5.0,
    }
})

export default BottomTabBar;
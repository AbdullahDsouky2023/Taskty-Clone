import React, { useCallback, useEffect } from "react";
import { SafeAreaView, View, StatusBar, Image, StyleSheet, BackHandler } from "react-native";
import { Colors, Sizes } from "../constant/styles";
import { CircleFade } from 'react-native-animated-spinkit';
import { useFocusEffect } from "@react-navigation/native";
import Logo from "../component/Logo";
import { useDispatch, useSelector } from "react-redux";
import { userRegisterSuccess } from "../store/features/userSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from '@env';
import { getUserByPhoneNumber } from "../../utils/user";
import { auth } from "../../firebaseConfig";

const SplashScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    let user = useSelector((state) => state.user?.user?.phoneNumber);
    
    const backAction = () => {
        BackHandler.exitApp();
        return true;
    }

    useEffect(() => {
        async function checkUserAndNavigate() {
try {
    const userDataString = await AsyncStorage.getItem("userData");
    if (userDataString) {
        const userData = JSON.parse(userDataString);
        dispatch(userRegisterSuccess(userData));
        navigation.push("App");
        const gottenuser = await getUserByPhoneNumber(user)
        console.log("user you want is ",gottenuser.email)
    } else {
        navigation.push("Auth");
    }
    
} catch (error) {
    console.log(error);
}

        }
      
        checkUserAndNavigate();
      }, [user]);
      


    useFocusEffect(
        useCallback(() => {
            BackHandler.addEventListener("hardwareBackPress", backAction);
            return () => BackHandler.removeEventListener("hardwareBackPress", backAction);
        }, [backAction])
    );

      
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <Logo/>
                <CircleFade
                    size={45}
                    color={Colors.primaryColor}
                    style={{ alignSelf: 'center' }}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    appLogoStyle: {
        width: 200.0,
        height: 200.0,
        alignSelf: 'center',
        marginBottom: Sizes.fixPadding * 4.0,
    },
})

export default SplashScreen;

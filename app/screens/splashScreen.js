import React, { useCallback, useEffect } from "react";
import { SafeAreaView, View, StatusBar, Image, StyleSheet, BackHandler } from "react-native";
import { Colors, Sizes } from "../constant/styles";
import { CircleFade } from 'react-native-animated-spinkit';
import { useFocusEffect } from "@react-navigation/native";
import Logo from "../component/Logo";
import { useDispatch, useSelector } from "react-redux";
import { userRegisterSuccess } from "../store/features/userSlice";
import { auth } from "../../firebaseConfig";
import { getItem, setItem } from "../utils/secureStore";

const SplashScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    let user = useSelector((state) => state.user?.user?.phoneNumber);

    const backAction = () => {
        BackHandler.exitApp();
        return true;
    }

    // Dispatch the userRegisterSuccess action inside a useEffect hook
    useEffect(() => {
        if(auth.currentUser !== null) dispatch(userRegisterSuccess(auth?.currentUser));
        if(getItem('userData') !== null) dispatch(userRegisterSuccess(getItem('userData')));
        console.log("Now user data is redux " , user)
        console.log("Now user data is storage " , getItem('userData'))
        // console.log('uuuuuuuuuuuuuuuuuuuuuuu from splasggh ')
        
    }, [auth.currentUser]);


    useFocusEffect(
        useCallback(() => {
            BackHandler.addEventListener("hardwareBackPress", backAction);
            return () => BackHandler.removeEventListener("hardwareBackPress", backAction);
        }, [backAction])
    );

    useEffect(() => {
        setTimeout(() => {
            navigation.push(user ? "App" : "App");
        }, 2000);
    }, [user, navigation]);

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

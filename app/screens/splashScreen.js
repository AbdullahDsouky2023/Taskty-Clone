import React, { useCallback, useEffect } from "react";
import { SafeAreaView, View, StatusBar, Image, StyleSheet, BackHandler } from "react-native";
import { Colors, Sizes } from "../constant/styles";
import { CircleFade } from 'react-native-animated-spinkit';
import { useFocusEffect } from "@react-navigation/native";
import Logo from "../component/Logo";
import { useDispatch, useSelector } from "react-redux";
import { userRegisterSuccess } from "../store/features/userSlice";
import { auth } from "../../firebaseConfig";
import { getItem, getUserData, setItem } from "../utils/secureStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { checkUserAndSetName } from "../utils/firebase/user";

const SplashScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    let user = useSelector((state) => state.user?.user?.phoneNumber);

    const backAction = () => {
        BackHandler.exitApp();
        return true;
    }

    useEffect(() => {
        async function checkUserAndNavigate() {
          const userDataString = await AsyncStorage.getItem("userData");
          if (userDataString) {
            const userData = JSON.parse(userDataString);
             dispatch(userRegisterSuccess(userData));
                navigation.push("App");

          } else {
              navigation.push("App");
            // console.log("No user data found in AsyncStorage");
          }
      
        }
      
        checkUserAndNavigate();
      }, [user, navigation]);
      


    useFocusEffect(
        useCallback(() => {
            BackHandler.addEventListener("hardwareBackPress", backAction);
            return () => BackHandler.removeEventListener("hardwareBackPress", backAction);
        }, [backAction])
    );

    // useEffect(() => {
    //     setTimeout(() => {
    //       navigation.push(user ? "App" : "Auth");
    //     }, 5000);
    //   }, [user, navigation]);
      
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

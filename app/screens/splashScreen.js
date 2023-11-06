import React, { useCallback, useEffect } from "react";
import { SafeAreaView, View, StatusBar, Image, StyleSheet, BackHandler } from "react-native";
import { Colors, Sizes } from "../constant/styles";
import { CircleFade } from 'react-native-animated-spinkit';
import { useFocusEffect } from "@react-navigation/native";
import Logo from "../component/Logo";
import { useDispatch, useSelector } from "react-redux";
import { userRegisterSuccess } from "../store/features/userSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
              navigation.push("Auth");
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

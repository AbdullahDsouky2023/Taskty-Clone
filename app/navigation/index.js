import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { TransitionPresets } from "@react-navigation/stack";
import { LogBox } from "react-native";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

import LoadingScreen from "../component/loadingScreen";
import SplashScreen from "../screens/splashScreen";
import AuthNavigator from "./AuthNavigator";
import AppNavigator from "./AppNavigator";

LogBox.ignoreAllLogs();

const Stack = createSharedElementStackNavigator();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      >
        <Stack.Screen name="Loading" component={LoadingScreen} />
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Auth" component={AuthNavigator} />
        <Stack.Screen name="App" component={AppNavigator} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;

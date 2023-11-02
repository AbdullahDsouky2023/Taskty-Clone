import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { TransitionPresets } from "@react-navigation/stack";
import { useSelector } from "react-redux";
import { LogBox } from "react-native";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

import LoadingScreen from "../component/loadingScreen";
import SplashScreen from "../screens/splashScreen";
import AuthNavigator from "./AuthNavigator";
import AppNavigator from "./AppNavigator";
import { ITEM_DETAILS } from "./routes";
import ItemScreen from "../screens/ItemScreen";

LogBox.ignoreAllLogs();

const Stack = createSharedElementStackNavigator();
const RootNavigator = () => {
  const user = useSelector((state) => state.user.user);

  return (
    <NavigationContainer >
      <Stack.Navigator
      
        screenOptions={{
          headerShown: false,
          
          ...TransitionPresets.SlideFromRightIOS,
        }}
      >
        <Stack.Screen name="Loading" component={LoadingScreen} />
        <Stack.Screen name="Splash" component={SplashScreen} />
        {
          user ? 
          <Stack.Screen name="App" component={AppNavigator} />:
          <Stack.Screen name="Auth" component={AuthNavigator} />
        }
        <Stack.Screen name={ITEM_DETAILS} component={ItemScreen} options={{headerShown:false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;

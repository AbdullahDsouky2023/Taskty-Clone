import React from 'react'
import {Stack, createStackNavigator} from '@react-navigation/stack'
import SigninScreen from "../screens/auth/signinScreen";
import RegisterScreen from "../screens/auth/registerScreen";
import VerificationScreen from "../screens/auth/verificationScreen";
import { TransitionPresets } from "@react-navigation/stack";

export default function AuthNavigator() {
    const Stack = createStackNavigator()
    
  return (
    <Stack.Navigator
    screenOptions={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Verification" component={VerificationScreen} />
       <Stack.Screen name="SignIn" component={SigninScreen} options={{ ...TransitionPresets.DefaultTransition }} />
    </Stack.Navigator>
  )
}
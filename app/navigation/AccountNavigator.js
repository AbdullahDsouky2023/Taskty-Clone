import React from 'react'
import {Stack, createStackNavigator} from '@react-navigation/stack'
import SigninScreen from "../screens/auth/signinScreen";
import RegisterScreen from "../screens/auth/registerScreen";
import VerificationScreen from "../screens/auth/verificationScreen";
import { TransitionPresets } from "@react-navigation/stack";
import AccountScreen from '../screens/account/accountScreen';
import WalletScreen from '../screens/wallet/walletScreen';

export default function AccountNavigator() {
    const Stack = createStackNavigator()
    
  return (
    <Stack.Navigator
    screenOptions={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
       <Stack.Screen name="Account" component={AccountScreen} options={{ ...TransitionPresets.DefaultTransition }} />
        <Stack.Screen name="wallet" component={WalletScreen} />
        <Stack.Screen name="Verification" component={VerificationScreen} />
    </Stack.Navigator>
  )
}
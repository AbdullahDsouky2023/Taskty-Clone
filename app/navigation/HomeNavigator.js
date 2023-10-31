import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import SigninScreen from "../screens/auth/signinScreen";
import { MaterialIcons } from '@expo/vector-icons';
import { TransitionPresets } from "@react-navigation/stack";
import { ITEM_DETAILS } from './routes';
import HomeScreen from '../screens/home/homeScreen';
import { useTranslation } from 'react-i18next';
import ItemDetails from '../component/ItemDetails';

export default function HomeNavigator() {
    const Stack = createStackNavigator()
    const { t } = useTranslation()
    
  return (
    <Stack.Navigator
    screenOptions={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
        <Stack.Screen
                    name={t('Home')}
                    component={HomeScreen}
                   
                />
    </Stack.Navigator>
  )
}
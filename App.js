import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { TransitionPresets } from '@react-navigation/stack';
import { LogBox } from 'react-native';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import LoadingScreen from "./component/loadingScreen";
import activeOrdersScreen from "./screens/activeOrders/activeOrdersScreen";
import OffersScreen from './screens/offers/offersScreen';
import AddAddressScreen from './screens/addAddress/addAddressScreen';
import ChooseLocationScreen from './screens/chooseLocation/chooseLocationScreen';
import SearchScreen from './screens/search/searchScreen';
import SplashScreen from './screens/splashScreen';
import SigninScreen from './screens/auth/signinScreen';
import RegisterScreen from './screens/auth/registerScreen';
import VerificationScreen from './screens/auth/verificationScreen';
import BottomTabBar from './component/bottomTabBarScreen';
import OfferDetailScreen from './screens/offerDetail/offerDetailScreen';
import CartScreen from './screens/cart/cartScreen';
import OrderMedicinesScreen from './screens/orderMedicines/orderMedicinesScreen';
import SelectAddressScreen from './screens/selectAddress/selectAddressScreen';
import PreviouslyBoughtItemsScreen from './screens/previouslyBoughtItems/previouslyBoughtItemsScreen';
import ProductDescriptionScreen from './screens/productDescription/productDescriptionScreen';
import AvailableProductsScreen from './screens/availableProduct/availableProductScreen';
import FilterScreen from './screens/filter/filterScreen';
import UploadPrescriptionScreen from './screens/uploadPrescription/uploadPrescriptionScreen';
import TrackOrderScreen from './screens/trackOrder/trackOrderScreen';
import PaymentScreen from './screens/payment/paymentScreen';
import TermsAndConditionsScreen from './screens/termsAndConditions/termsAndConditionsScreen';

LogBox.ignoreAllLogs();

const Stack = createSharedElementStackNavigator();

const App = () => {
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
        <Stack.Screen name="SignIn" component={SigninScreen} options={{ ...TransitionPresets.DefaultTransition }} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Verification" component={VerificationScreen} />
        <Stack.Screen name="BottomTabBar" component={BottomTabBar} options={{ ...TransitionPresets.DefaultTransition }} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="ChooseLocation" component={ChooseLocationScreen} />
        <Stack.Screen name="AddAddress" component={AddAddressScreen} />
        <Stack.Screen name="Offers" component={OffersScreen} />
        <Stack.Screen name="OfferDetail" component={OfferDetailScreen} />
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen name="OrderMedicines" component={OrderMedicinesScreen} />
        <Stack.Screen name="SelectAddress" component={SelectAddressScreen} />
        <Stack.Screen name="PreviouslyBoughtItems" component={PreviouslyBoughtItemsScreen} />
        <Stack.Screen name="ProductDescription" component={ProductDescriptionScreen}
          sharedElements={(route, otherRoute, showing) => {
            const item = route.params.item;
            return [item.id];
          }}
        />
        <Stack.Screen name="AvailableProduct" component={AvailableProductsScreen} />
        <Stack.Screen name="Filter" component={FilterScreen} />
        <Stack.Screen name="UploadPrescription" component={UploadPrescriptionScreen} />
        <Stack.Screen name="ActiveOrdersScreen" component={activeOrdersScreen} />
        <Stack.Screen name="TrackOrder" component={TrackOrderScreen} />
        <Stack.Screen name="Payment" component={PaymentScreen} />
        <Stack.Screen name="TermsAndConditions" component={TermsAndConditionsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
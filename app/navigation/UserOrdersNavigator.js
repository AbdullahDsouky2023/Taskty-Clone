import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { TransitionPresets } from "@react-navigation/stack";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";


import { ITEM_DETAILS, ITEM_ORDER_DETAILS, ORDERS, ORDERS_DETAILS } from "./routes";
import ItemScreen from "../screens/Item/ItemScreen";
import ItemOrderDetails from "../screens/Item/ItemOrderDetails";
import CurrentOrders from "../screens/Orders/CurrentOrders";
import OrderDetails from "../screens/Orders/OrderDetails";


const UserOrdersNavigator = ({route}) => {
    const Stack = createSharedElementStackNavigator();
    // const { item } = route.params
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,

          ...TransitionPresets.SlideFromRightIOS,
          
        }}
        
      >
        <Stack.Screen
          name={ORDERS}
          component={CurrentOrders}
          
          // initialParams={{ item }} // Pass the item object to ItemOrderDetails

          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={ORDERS_DETAILS}
          component={OrderDetails}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
  );
};

export default UserOrdersNavigator;

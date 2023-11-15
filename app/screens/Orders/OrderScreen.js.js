;
import { createStackNavigator } from "@react-navigation/stack";
import { TransitionPresets } from "@react-navigation/stack";
import CurrentOrdersTabNavigator from "../../navigation/CurrentOrdersTabNavigator";
import { COMPLETE_ORDER_DETAILS, ORDERS_DETAILS } from "../../navigation/routes";
import OrderDetails from "./OrderDetails";
import CompleteOrderDetails from "./CompleteOrderDetails";


function OrderScreen() {
  const Stack = createStackNavigator()
  return (
    <>
      <Stack.Navigator
    screenOptions={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
        <Stack.Screen
                    name={"CurrentOrdersTabNavigator"}
                    component={CurrentOrdersTabNavigator}
                   
                />
        <Stack.Screen
                    name={ORDERS_DETAILS}
                    component={OrderDetails}
                   
                />
        <Stack.Screen
                    name={COMPLETE_ORDER_DETAILS}
                    component={CompleteOrderDetails}
                   
                />
    </Stack.Navigator>
    </>
  );
}

export default OrderScreen;

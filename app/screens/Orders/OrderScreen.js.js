import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import CurrentOrders from "./CurrentOrders";
import { Colors, mainFont } from "../../constant/styles";
import { useTranslation } from "react-i18next";
import AppHeader from "../../component/AppHeader";

const Tab = createMaterialTopTabNavigator();

function OrderScreen() {
  const { t } = useTranslation();
  return (
    <>
      <AppHeader subPage={true} />

      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: Colors.primaryColor,
          tabBarInactiveTintColor: Colors.grayColor,
          tabBarLabelStyle: {
            fontSize: 14.0,
            fontFamily: mainFont.light,
          },
          tabBarIndicatorStyle: {
            backgroundColor: Colors.primaryColor, // Change this to the color you want
            height: 3, // Change the height of the indicator line
          },
        }}
      >
        <Tab.Screen name={t("CurrentOrders")} component={CurrentOrders} />
        <Tab.Screen name={t("PreviousOrders")} component={CurrentOrders} />
      </Tab.Navigator>
    </>
  );
}

export default OrderScreen;

import React, { useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  View,
  StyleSheet,
  Dimensions,
} from "react-native";

import { Colors } from "../../constant/styles";
import GeneralSettings from "../../component/Account/GeneralSettings";
import Logo from "../../component/Logo";



const AccountScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <StatusBar backgroundColor={Colors.primaryColor} />
      <View style={{ flex: 1 }}>
        <Logo />
        <GeneralSettings/>
      </View>
    </SafeAreaView>
  );
};


export default AccountScreen;

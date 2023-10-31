import React, { useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Colors } from "../../constant/styles";
import UserImageAndName from "../../component/Account/UserImageAndName";
import GeneralSettings from "../../component/Account/GeneralSettings";


const { width } = Dimensions.get("screen");

const AccountScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <StatusBar backgroundColor={Colors.primaryColor} />
      <View style={{ flex: 1 }}>
        <UserImageAndName/>
        <GeneralSettings/>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default AccountScreen;

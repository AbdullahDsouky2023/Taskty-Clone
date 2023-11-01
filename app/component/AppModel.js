import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { Colors, Sizes, Fonts } from "../constant/styles";
import Dialog from "react-native-dialog";
import { CircleFade } from "react-native-animated-spinkit";
import AppText from "./AppText";

const { width } = Dimensions.get("screen");

export default function AppModal({visible,message}) {
  return (
    <Dialog.Container
      visible={visible}
      contentStyle={styles.dialogContainerStyle}
    >
      <View style={{ backgroundColor: "white", alignItems: "center" }}>
        {/* <CircleFade size={45} color={Colors.primaryColor} /> */}
        <Text
          style={{
            ...Fonts.primaryColor15Light,
            marginTop: Sizes.fixPadding * 2.0,
          }}
        >
         <AppText text={{message}}/>
        </Text>
      </View>
    </Dialog.Container>
  );
}
const styles = StyleSheet.create({
    dialogContainerStyle: {
        borderRadius: Sizes.fixPadding,
        width: width - 80,
        paddingBottom: Sizes.fixPadding * 3.0,
      },
})
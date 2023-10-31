import { View, Text, StyleSheet, Dimensions } from "react-native";
import React from "react";
import AppText from "../AppText";
import { Colors } from "../../constant/styles";
import SettingItem from "./SettingItem";
import { FlatList } from "react-native-gesture-handler";
import { settingsItemArray } from "../../data/account";
const { width } = Dimensions.get("screen");
export default function GeneralSettings() {
  return (
    <View style={styles.container}>
      <AppText text="GeneralSettings" centered={false} style={styles.header} />
      <FlatList
        data={settingsItemArray}
        renderItem={({ item }) => {
          return (
          <SettingItem item={item}/>
          )
        }}
        keyExtractor={(item, index) => item.name + index}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  header: {
    color: Colors.primaryColor,
    fontSize: 18,
  },
  textHeader: {
    color: Colors.blackColor,
    fontSize: 16,
  },
  headerDescription: {
    color: Colors.grayColor,
    fontSize: 16,
  },
  item: {
    backgroundColor: Colors.whiteColor,
    height: 70,
    borderRadius: 12,
    paddingHorizontal: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // width: width * 1,
  },
  itemHeader: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    // justifyContent:'center',
    gap: 15,
  },
});

import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import React from "react";
import { useDispatch } from "react-redux";


import AppText from "../AppText";
import AppButton from "../AppButton";
import { Colors } from "../../constant/styles";
import SettingItem from "./SettingItem";
import { FlatList } from "react-native-gesture-handler";
import { settingsItemArray } from "../../data/account";
import { auth } from '../../../firebaseConfig'
import { userRegisterSuccess } from "../../store/features/userSlice";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const { width } = Dimensions.get("screen");
export default function GeneralSettings() {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const handleSignOut=async()=>{
    try {
      await auth.signOut()
     await   AsyncStorage.removeItem('userData')
      // dispatch(userRegisterSuccess(null))
      navigation.navigate('Loading')
    } catch (error) {
      console.log('====================================');
      console.log(error);
      console.log('====================================');
    }
  }
  return (
    <ScrollView style={styles.container}>
      <AppText text="GeneralSettings" centered={false} style={styles.header} />
      <View>

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
      <AppButton title={'تسجيل الخروج'} style={{marginVertical:20}} onPress={handleSignOut}/>
    </ScrollView>
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

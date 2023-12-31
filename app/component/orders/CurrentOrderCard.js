import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Colors } from "../../constant/styles";
import AppText from "../../component/AppText";
import { useNavigation } from "@react-navigation/native";
import { ORDERS_DETAILS } from "../../navigation/routes";
import PriceTextComponent from "../PriceTextComponent";
const { width } = Dimensions.get("screen");
import { Ionicons } from '@expo/vector-icons';
export default function CurrentOrderCard({ item,onPress }) {
  const navigation = useNavigation();
  return (
    <TouchableWithoutFeedback
      onPress={onPress}
    >
      <View style={styles.orderCardContainer}>
        {/* name */}
        <AppText
          text={item?.attributes?.service?.data?.attributes?.name}
          centered={false}
          style={styles.name}
        />
        {/* category */}
        <View style={styles.date}>
          <Ionicons name="ios-location-outline" size={24} color="black" />
          <AppText
            text={item?.attributes?.location}
            centered={false}
            style={styles.title}
          />
        </View>
        {/* Price */}
        <View style={styles.date}>
          <FontAwesome5 name="money-check" size={18} color="black" />
          <PriceTextComponent
            price={item?.attributes?.service?.data?.attributes?.Price}
           />
        </View>
        {/* date */}
        <View style={styles.date}>
          <FontAwesome name="calendar" size={24} color="black" />
          <AppText
            text={`${item?.attributes?.date }  - ${item?.attributes?.time}`}
            centered={false}
            style={styles.title}
          />
        </View>
        <View style={styles.date}>
        <Ionicons name="person-outline" size={24} color="black" />     
             <AppText
            text={item?.attributes?.provider?.data?.attributes?.name  || "في انتظار العامل "}
            centered={false}
            style={styles.title}
          />
        </View>
        
        {/*time */}
        {/*time */}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: Colors.whiteColor,
    width: width,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  orderCardContainer: {
    paddingVertical: 10,
    width: width * 0.88,
    paddingHorizontal: 20,
    height: 170,
    marginTop: 12,
    flex: 1,
    gap: 5,
    backgroundColor: Colors.whiteColor,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    borderColor: Colors.blackColor,
    borderWidth: 0.4,
    borderRadius: 8,
  },
  name: {
    color: Colors.blackColor,
    fontSize: 15,
  },
  title: {
    color: Colors.blackColor,
    fontSize: 14,
  },
  price: {
    color: Colors.primaryColor,
    fontSize: 14,
  },
  date: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    justifyContent: "flex-start",
    flexDirection: "row",
  },
});

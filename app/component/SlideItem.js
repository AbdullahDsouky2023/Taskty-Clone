import { View, Text, Dimensions } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { ITEM_DETAILS } from "../navigation/routes";
import { TouchableOpacity } from "react-native";
import { Image } from "react-native";
const { width } = Dimensions.get("screen");
export default function SlideItem({ item }) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate(ITEM_DETAILS, { item: item?.attributes?.service?.data });
      }}
    >
      <Image
        source={{ uri: item?.attributes?.image?.data?.attributes?.url }}
        style={{ width: width, height: 180.0 }}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );
}

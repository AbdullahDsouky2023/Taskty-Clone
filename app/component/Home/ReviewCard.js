import { View, Text, Dimensions, Image } from "react-native";
import React from "react";
import { StyleSheet } from "react-native";
import { Colors } from "../../constant/styles";
import AppText from "../AppText";
const { width } = Dimensions.get("screen");
export default function ReviewCard() {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.reviewContainer}>
        <AppText text={"SercureOrder"} style={{ color: Colors.blackColor }} />
        <AppText text={"clientReviews"} style={{ fontSize: 13 }} />
        <View>
            <View>
          <Image source={{ uri: "https://media.istockphoto.com/id/904172104/photo/weve-made-it-all-this-way-i-am-proud.jpg?b=1&s=612x612&w=0&k=20&c=JRmndTMyz627jxKiUjgXSJXrxwuAiHkHjefiRsyY2jc=" }} />
            </View>
          <AppText
            style={{ fontSize: 13, color: Colors.blackColor }}
            text={
              " اليوم اول مره اتعامل مع شركتكم لاعمال السباكه في منزلي .. اشكركم علي مستوي الخدمه الرائع حيث زارني سباك ولاول مره اجد عامل محترف ي وسريع جدا في انجاز العمل المطلوب"
            }
          />
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  cardContainer: {
    height: 250,
    width: width * 1,
    backgroundColor: Colors.whiteColor,
    padding: 10,
  },
  reviewContainer: {
    elevation: 1,
  },
  text: {},
  image :{
    height:100,
    width:100,
    borderRadius:'50%'
  }
});

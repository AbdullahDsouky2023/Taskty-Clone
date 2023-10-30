import { View, Text, Dimensions, Image } from "react-native";
import React from "react";
import { StyleSheet } from "react-native";
import { Colors } from "../../constant/styles";
import AppText from "../AppText";
const { width } = Dimensions.get("screen");
const defaultImage ='https://media.istockphoto.com/id/904172104/photo/weve-made-it-all-this-way-i-am-proud.jpg?b=1&s=612x612&w=0&k=20&c=JRmndTMyz627jxKiUjgXSJXrxwuAiHkHjefiRsyY2jc="'
export default function ReviewCard({username,review,userImage}) {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.reviewContainer}>
        <View style={styles.header}>

        <AppText text={"SercureOrder"} style={{ color: Colors.blackColor }} />
        <AppText text={"clientReviews"} style={{ fontSize: 13 }} />
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.userImageContainer}>
            <Image
              style={styles.image}
              source={{
                uri: userImage ? userImage : defaultImage,
              }}
            />
            <AppText
              text={username}
              style={{ color: Colors.blackColor, fontSize: 12 }}
            />
          </View>
          <AppText
            style={{
              fontSize: 14,
              color: Colors.blackColor,
              width: width * 0.8,
            }}
            centered={false}
            text={review }
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
    paddingHorizontal: 20,
    backgroundColor: Colors.whiteColor,
  },
  reviewContainer: {
    elevation: 1,
  },
  text: {},
  userImageContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  contentContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  image: {
    height: 70,
    width: 70,
    borderRadius: 35,
  },
  header :{
    display:'flex',
    alignItems:'center'
  }
});

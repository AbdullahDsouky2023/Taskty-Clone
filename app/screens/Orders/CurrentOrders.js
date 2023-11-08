import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { ScrollView } from "react-native-virtualized-view";
import { Colors } from "../../constant/styles";
import AppText from "../../component/AppText";
import { FontAwesome } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons';
const { width } = Dimensions.get("screen");



export default function CurrentOrders() {

  const user = useSelector((state) => state?.user?.user);
  const orders = useSelector((state) => state?.orders?.orders);
  const currentOrders = orders?.data.filter(
    (order) => order?.attributes?.phoneNumber === user?.phoneNumber
  );

  const item = currentOrders[0]

  console.log("from the current order Screen", currentOrders.length);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.orderCardContainer}>

        {/* name */}
        <AppText 
        text={item?.attributes?.service?.data?.attributes?.name}
        centered={false}
        style={styles.name}
        />
        {/* category */}
        <AppText 
        text={item?.attributes?.location}
        centered={false}
        style={styles.name}
        />
        {/* Price */}
        <AppText 
        text={item?.attributes?.service?.data?.attributes?.Price}
        centered={false}
        style={styles.price}
        />
        {/* date */}
        <View style={styles.date}>
        <FontAwesome name="calendar" size={24} color="black" />
        <AppText 
        text={item?.attributes?.date}
        centered={false}
        style={styles.name}
        />

        </View>
        <View style={styles.date}>
        <Ionicons name="time-outline" size={24} color="black" />    
        <AppText text={item?.attributes?.time} centered={false} style={styles.name}/>

        </View>
        {/*time */}
        {/*time */}
      </View>
    </ScrollView>
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
    height: 160,
    backgroundColor:Colors.whiteColor,
    // elevation:1,
    borderColor: Colors.blackColor,
    borderWidth: 0.4,
    borderRadius:8
  },
  name:{
      color:Colors.blackColor,
      fontSize:15
  },
  price:{
      color:Colors.primaryColor,
      fontSize:15
  },
  date:{
    display:'flex',
    alignItems:"center",gap:10,
    justifyContent:'flex-start',
    flexDirection:"row",
  }

});

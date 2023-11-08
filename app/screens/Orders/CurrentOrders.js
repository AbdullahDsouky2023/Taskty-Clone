import { Dimensions, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ScrollView } from "react-native-virtualized-view";
import CurrentOrderCard from "../../component/orders/CurrentOrderCard";
import { FlatList } from "react-native-gesture-handler";
import { Colors } from "../../constant/styles";
import AppText from "../../component/AppText";
const { width } = Dimensions.get("screen");


export default function CurrentOrders() {
  
  const user = useSelector((state) => state?.user?.user);
  const orders = useSelector((state) => state?.orders?.orders);
    
  const currentOrders = orders?.data?.filter(
    (order) => order?.attributes?.phoneNumber === user?.phoneNumber
    );
    const item = currentOrders[0]
    console.log("from the current order Screen", currentOrders.length);

  return (
    <>
    {currentOrders.length === 0 ? 
      <View style={styles.noItemContainer}>
      
      <AppText text={"لا يوجد طلبات لعرضها"} /> 
      </View>
      :
      <ScrollView style={styles.container}>
      <FlatList
      data={currentOrders}
      style={styles.listContainer}
      renderItem={({item})=>{
        return <CurrentOrderCard item={item}/>
      }}
      keyExtractor={(item)=>item.id}
      />
      </ScrollView>
    }
        </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: Colors.whiteColor,
    width: width,
    paddingHorizontal: 20,
    // paddingTop:10,
    // paddingBottom:10,
    paddingVertical: -10,
  },
 listContainer:{
  display:"flex",
  gap:10
 },
 noItemContainer:{
  display:'flex',
  alignItems:'center',
  justifyContent:'center',
  height:"100%",
  width:width,
  backgroundColor:Colors.whiteColor
 }

});

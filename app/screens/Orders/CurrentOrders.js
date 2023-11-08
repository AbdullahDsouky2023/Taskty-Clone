import { Dimensions, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ScrollView } from "react-native-virtualized-view";
import { FontAwesome } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Colors } from "../../constant/styles";
import AppText from "../../component/AppText";
import CurrentOrderCard from "../../component/orders/CurrentOrderCard";
import { FlatList } from "react-native-gesture-handler";
const { width } = Dimensions.get("screen");


export default function CurrentOrders() {
  
  // const [ user,setUser] = useState({})
  const [ currentOrders,setCurrentOrders] = useState([])
  const item = currentOrders[0]
  const user = useSelector((state) => state?.user?.user);
  const orders = useSelector((state) => state?.orders?.orders);
  useEffect(()=>{
    
    const currentOrders = orders?.data.filter(
      (order) => order?.attributes?.phoneNumber === user?.phoneNumber
    );
    setCurrentOrders(currentOrders)
    console.log("from the current order Screen", currentOrders.length);
    },[])

  return (
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
 }

});

import { View, Text, ScrollView, StyleSheet } from "react-native";
import React from "react";
import ItemDetails from "../../component/ItemDetails";
import OtherServicesList from "../../component/Home/OtherServicesList";
import ReserveButton from "../../component/ReverveButton";
import UsersReviews from "../../component/Home/UsersReview";
import { ITEM_ORDER_DETAILS } from "../../navigation/routes";

export default function ItemOrderDetails({route,navigation}) {
  const { item } = route.params
  return (
    <View style={styles.container}>
    <ScrollView>
      <ItemDetails item={item} />
      <OtherServicesList />
      <UsersReviews/>
    </ScrollView>
   <ReserveButton price={item.price} onPress={()=>navigation.navigate(ITEM_ORDER_DETAILS,{item})}/>
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 100,
  },
  
});

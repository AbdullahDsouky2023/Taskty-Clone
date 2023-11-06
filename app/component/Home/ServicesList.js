import React from "react";
import { FlatList, StyleSheet } from "react-native";

import ServiceCard from "./ServiceCard";
import { servicesList } from "../../data/home";
import HeaderTextComponent from "./HeaderTextComponent";
import { useSelector } from "react-redux";

export default function ServicesList() {
  const categories = useSelector((state)=>state.categories.categories)
  return (
    <HeaderTextComponent name={'servicesLookingFor'} showAll={true}>

      <FlatList
          data={categories.data}
          style={styles.listContainer}
          renderItem={({ item }) => {
            return <ServiceCard name={item?.attributes.name} image={item?.attributes?.image?.data[0]?.attributes.url} />;
          }}
          keyExtractor={(item,index) => item.id}
        />
          </HeaderTextComponent>
  );
}
const styles = StyleSheet.create({
  listContainer :{
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    padding: 16,
  }
});

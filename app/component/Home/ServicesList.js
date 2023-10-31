import React from "react";
import { FlatList, StyleSheet } from "react-native";

import ServiceCard from "./ServiceCard";
import { servicesList } from "../../data/home";
import HeaderTextComponent from "./HeaderTextComponent";

export default function ServicesList() {
  return (
    <HeaderTextComponent name={'servicesLookingFor'} showAll={true}>

      <FlatList
          data={servicesList}
          style={styles.listContainer}
          renderItem={({ item }) => {
            return <ServiceCard name={item.name} image={item.image} />;
          }}
          keyExtractor={(item,index) => item.name+index}
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

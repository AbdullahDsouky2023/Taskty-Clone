import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Colors, Sizes } from "../../constant/styles";
import AppText from "../../component/AppText";
import OfferCard from "../../component/OfferCard";
import AppHeader from "../../component/AppHeader";
import { useDispatch, useSelector } from "react-redux";
import useServices from "../../../utils/services";
import { setServices } from "../../store/features/serviceSlice";

const { width } = Dimensions.get("screen");

const CurrentOffersScreen = ({ navigation }) => {
  const [slectedItem, setSelectedItem] = useState("الكهرباء ");
  const categories = useSelector((state) => state.categories.categories);

  const selectedItemsData = categories.data.find(
    (category) => category?.attributes.name === slectedItem
  );
  const dispatch = useDispatch();
  const { data, isLoading, isError } = useServices();
  const services = data?.data.filter((item) => item?.attributes.category?.data.id === selectedItemsData.id);
  const getData = async () => {
    if (data) {
      // Dispatch the fetched categories to the Redux store
      dispatch(setServices(data));
    } else if (isError) {
      console.log(isError);
      // Handle the error
    }
  };

  useEffect(() => {
    getData();
  }, [dispatch, data]);

  if (isLoading) return <Text>Loading...</Text>;
  if (isError) return <Text>Error fetching data.</Text>;
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <StatusBar backgroundColor={Colors.primaryColor} />
      <AppHeader />
      <View style={styles.container}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categories.data}
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 10,
          }}
          keyExtractor={(item, index) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={
                item == selectedItemsData ? styles.activeItem : styles.item
              }
              onPress={() => setSelectedItem(item?.attributes.name)}
            >
              <AppText
                text={item?.attributes.name}
                style={{ color: Colors.whiteColor }}
              />
            </TouchableOpacity>
          )}
        />

        <View style={{ padding: 23 }}>
          <View style={{ marginBottom: 10 }}>
            <AppText
              text={slectedItem}
              centered={false}
              style={{ fontSize: 25, color: Colors.blackColor }}
            />
          </View>
          <FlatList
            data={services}
            renderItem={({ item }) => (
              <OfferCard
                service={item.attributes.name}
                price={item.attributes.Price}
                image={item.attributes.image.data.attributes.url}
              />
            )}
            ItemSeparatorComponent={<View style={{ height: 10 }} />}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
  },
  item: {
    height: 50,
    borderRadius: 8,
    width: "auto",
    paddingHorizontal: 18,
    backgroundColor: Colors.blackColor,
    marginLeft: 15,
    display: "flex",
    justifyContent: "center",
  },
  activeItem: {
    height: 50,
    borderRadius: 8,
    width: "auto",
    paddingHorizontal: 18,
    backgroundColor: Colors.primaryColor,
    marginLeft: 15,
    display: "flex",
    justifyContent: "center",
  },

  animatedView: {
    backgroundColor: "#333333",
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
    borderRadius: Sizes.fixPadding + 5.0,
    paddingHorizontal: Sizes.fixPadding + 5.0,
    paddingVertical: Sizes.fixPadding,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CurrentOffersScreen;

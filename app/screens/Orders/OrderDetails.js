import {
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useState } from "react";
import AppButton from "../../component/AppButton";
import AppText from "../../component/AppText";
import { Colors } from "../../constant/styles";
import AppHeader from "../../component/AppHeader";
import useOrders, { cancleOrder } from "../../../utils/orders";
import { useDispatch } from "react-redux";
import { setOrders } from "../../store/features/ordersSlice";
import LoadingModal from "../../component/Loading";
import { ORDERS } from "../../navigation/routes";

const { width } = Dimensions.get("screen");
export default function OrderDetails({ navigation, route }) {
  const { item } = route?.params;
  const [isLoading, setIsLoading] = useState(false);
  const { data:orders } = useOrders()
  
 

  const handleOrderCancle = async (id) => {
    try {
      setIsLoading(true);
      const res = await cancleOrder(id);
      if (res) {
        dispatch(setOrders(orders))
            Alert.alert("تم الغاء الطلب بنجاح");
        navigation.goBack()
      }else {
        
        Alert.alert("حدثت مشكله حاول مرة اخري");
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <View>
      <AppHeader subPage={true} />
      <View style={styles.container}>
        <View>
          <AppText
            centered={false}
            text={item?.attributes?.service?.data?.attributes?.name}
            style={styles.name}
          />
        </View>
        <View style={styles.itemContainer}>
          <AppText centered={false} text={" السعر"} style={styles.title} />
          <AppText
            centered={false}
            text={item?.attributes?.service?.data?.attributes?.Price}
            style={styles.price}
          />
        </View>
        <View style={styles.itemContainer}>
          <AppText centered={false} text={" العنوان"} style={styles.title} />
          <AppText
            centered={false}
            text={item?.attributes?.location}
            style={styles.price}
          />
        </View>
        <View style={styles.itemContainer}>
          <AppText centered={false} text={" ملاحظات"} style={styles.title} />
          <AppText
            centered={false}
            text={
              item?.attributes?.description
                ? item?.attributes?.description
                : "لا يوجد"
            }
            style={styles.price}
          />
        </View>
        <View style={styles.itemContainer}>
          <AppText centered={false} text={" صور لطلبك"} style={styles.title} />
          <AppText
            centered={false}
            text={
              item?.attributes?.images?.data
                ? item?.attributes?.images?.data
                : "لا يوجد"
            }
            style={styles.price}
          />
        </View>
        <AppButton
          title={"الغاء الطلب"}
          onPress={() => handleOrderCancle(item.id)}
        />
      </View>
      <LoadingModal visible={isLoading} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 18,
  },
  name: {
    fontSize: 17,
    color: Colors.blackColor,
  },
  itemContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: 70,
    width: width * 0.9,
    padding: 10,
    borderWidth: 0.7,
    borderRadius: 10,
    marginVertical: 10,
    backgroundColor: Colors.piege,
    gap: 10,
  },
  price: {
    fontSize: 17,
    color: Colors.blackColor,
    marginTop: 5,
  },
  title: {
    fontSize: 21,
    color: Colors.primaryColor,
  },
});

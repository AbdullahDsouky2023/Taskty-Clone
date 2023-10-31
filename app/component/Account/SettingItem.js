import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constant/styles";
import AppText from "../AppText";
import { MaterialIcons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";



export default function SettingItem({item }) {
    const { icon, name, desc } = item
    return (
      <View style={styles.item}>
        <View style={styles.itemHeader}>
          <SimpleLineIcons name={icon} size={24} color={Colors.primaryColor} />
          <View>
            <AppText text={name} centered={false} style={styles.textHeader} />
            <AppText
              text={desc}
              centered={false}
              style={styles.headerDescription}
            />
          </View>
        </View>
        <MaterialIcons name="arrow-back-ios" size={24} color={Colors.grayColor} />
      </View>)
}

const styles = StyleSheet.create({
  header: {
    color: Colors.primaryColor,
    fontSize: 18,
  },
  textHeader: {
    color: Colors.blackColor,
    fontSize: 16,
  },
  headerDescription: {
    color: Colors.grayColor,
    fontSize: 16,
  },
  item: {
    backgroundColor: Colors.whiteColor,
    height: 70,
    borderRadius: 12,
    paddingHorizontal: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // width: width * 1,
  },
  itemHeader: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    // justifyContent:'center',
    gap: 15,
  },
});

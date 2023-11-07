import React from "react";
import { View, StyleSheet } from "react-native";

import AppText from "../AppText";
import { Colors, Sizes, Fonts } from "../../constant/styles";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { OFFERS } from "../../navigation/routes";

export default function HeaderTextComponent({ name, showAll, children }) {
  const navigation = useNavigation()
  const { t } = useTranslation()
  return (
    <View style={styles.Container}>
      <View style={styles.headerTextContainer}>
        <AppText text={name} style={styles.text} />
        {showAll && (
          <TouchableWithoutFeedback onPress={()=>navigation.navigate((OFFERS),{name:"all"})}>

          <AppText text={"showAll"} style={{ ...Fonts.primaryColor15Light }} />
          </TouchableWithoutFeedback>
        )}
      </View>
      <View style={styles.cardContainer}>{children}</View>
    </View>
  );
}
const styles = StyleSheet.create({
  Container: {
    margin: Sizes.fixPadding * 1.0,
    padding: Sizes.fixPadding * 1.0,
  },
  headerTextContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 18,
  },
  card: {
    height: 100,
    width: 100,
    backgroundColor: "#FCF1EA",
    borderRadius: 10,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },
  text: {
    color: Colors.blackColor,
    ...Fonts.blackColor14Medium,
  },
  imageCard: {
    height: 40,
    width: 40,
  },
  cardContainer: {},
});

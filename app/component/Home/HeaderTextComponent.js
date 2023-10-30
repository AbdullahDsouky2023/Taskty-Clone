import React from "react";
import { View, StyleSheet } from "react-native";

import AppText from "../AppText";
import { Colors, Sizes, Fonts } from "../../constant/styles";

export default function HeaderTextComponent({ name, showAll, children }) {
  return (
    <View style={styles.Container}>
      <View style={styles.headerTextContainer}>
        <AppText text={name} style={styles.text} />
        {showAll && (
          <AppText text={"showAll"} style={{ ...Fonts.primaryColor15Light }} />
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

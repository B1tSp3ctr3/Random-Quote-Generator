import React from "react";
import { View, StyleSheet, Image } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

import colors from "../config/colors";
import AppText from "./Text";

function ListItem({ title, subtitle, IconComponent, image, ImageInput }) {
  return (
    <View style={styles.container}>
      {IconComponent}
      {ImageInput}
      {image && <Image style={styles.image} source={image} />}
      <View style={styles.subcontainer}>
        <AppText style={styles.title} numberOfLines={1}>
          {title}
        </AppText>
        {subtitle && (
          <AppText style={styles.subtitle} numberOfLines={2}>
            {subtitle}
          </AppText>
        )}
      </View>
      <FontAwesome5 name="chevron-right" size={24} color={colors.mediumgrey} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#131315",
    alignItems: "center",
  },
  subcontainer: {
    alignItems: "flex-start",
    marginTop: 5,
    marginLeft: 10,
    flexWrap: "nowrap",
    justifyContent: "center",
    flex: 1,
  },

  title: {
    fontWeight: "bold",
    fontSize: 19,
  },
  subtitle: {
    color: colors.mediumgrey,
    fontSize: 17,
    textAlign: "left",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
});
export default ListItem;

import React from "react";
import { Image, StyleSheet, View } from "react-native";

import Button from "../components/Button";
import colors from "../config/colors";
function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.background}>
      <Image source={require("../assets/logo.png")} style={styles.logo} />
      <View style={styles.buttonContainer}>
        <Button
          title={"login"}
          onPress={() => navigation.navigate("Login")}
          underlayColor="#E0E0E0"
          color="neutral"
        />
        <Button
          title={"register"}
          onPress={() => navigation.navigate("Register")}
          underlayColor="#36648B"
          color="primary"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center", // Center the content vertically
    alignItems: "center", // Center the content horizontally
    backgroundColor: colors.secondary,
  },
  logo: {
    width: 300,
    height: 300,
    resizeMode: "contain",
    marginBottom: 50,
    position: "absolute",
    top: 100,
  },

  buttonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "black",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  buttonContainer: {
    padding: 5,
    paddingHorizontal: 40,
    width: "100%",
    position: "absolute",
    bottom: 50,
  },
});

export default WelcomeScreen;

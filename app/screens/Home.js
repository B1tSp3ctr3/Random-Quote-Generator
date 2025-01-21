import React, { useEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";

import { ActivityIndicator } from "react-native";
import Button from "../components/Button";
import Text from "../components/Text";
import App from "../../App";
import colors from "../config/colors";
import { getQuoteListings } from "../api/quotelistings";
import useAPI from "../hooks/useApi";
function Home({ navigation }) {
  const [quote, setQuote] = useState(null);
  const {
    data: quotelistings,
    error,
    loading,
    request: loadListings,
  } = useAPI(getQuoteListings);
  useEffect(() => {
    loadListings();
  }, []);
  useEffect(() => {
    if (quotelistings && quotelistings.length > 0) {
      setRandomQuote();
    }
  }, [quotelistings]);
  const setRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotelistings.length);
    setQuote(quotelistings[randomIndex]);
  };

  const handleNextQuote = () => {
    let randomIndex = 0;
    do {
      randomIndex = Math.floor(Math.random() * quotelistings.length);
    } while (quotelistings[randomIndex].text === quote.text); // Ensure the new quote is different

    setQuote(quotelistings[randomIndex]);
  };
  if (loading) {
    return (
      <ActivityIndicator visible={true} size={"large"} color={colors.primary} />
    );
  }
  if (!quote) {
    // Render a loading state or a fallback UI
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading quotes...</Text>
        <Button title="Retry" onPress={loadListings} />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/background.jpeg")}
        style={styles.image}
      />
      <View style={styles.overlay}>
        <Text>{quote.text}</Text>
        <Text style={styles.author}>{quote.author}</Text>
        <View style={{ width: "100%" }}>
          <Button
            title={"Next quote"}
            onPress={handleNextQuote}
            color="primary"
            underlayColor="underlayprimary"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  author: {
    fontSize: 18,
    fontWeight: "bold",
    textDecorationLine: "underline",
    textAlign: "left",
    color: colors.neutral,
  },
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 25,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  overlay: {
    position: "absolute",
    top: "30%", // Adjust as needed
    left: "10%",
    right: "10%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.secondary, // Semi-transparent black overlay to improve readability
    padding: 20,
    borderRadius: 10,
  },
  buttonContainer: {
    alignSelf: "center",
    width: "80%",
    marginTop: 20,
    position: "absolute",
    bottom: 50,
  },
});

export default Home;

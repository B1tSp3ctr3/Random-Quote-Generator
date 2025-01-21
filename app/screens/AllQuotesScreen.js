import { useState, useEffect } from "react";
import {
  FlatList,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import useApi from "../hooks/useApi";
import { getQuoteListings } from "../api/quotelistings";
import AppText from "../components/Text";
import colors from "../config/colors";
import ListItem from "../components/ListItem";
import ListItemSeparator from "../components/ListItemSeparator";
import Screen from "../components/Screen";
import Icon from "../components/Icon";
import AppButton from "../components/Button";
import React from "react";
function AllQuotesScreen({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const {
    data: quotelistings,
    error,
    loading,
    request: loadListings,
  } = useApi(getQuoteListings);
  useEffect(() => {
    const unsubscribeFocus = navigation.addListener("focus", () => {
      loadListings(); // Refresh data when the screen gains focus
    });
    return () => unsubscribeFocus();
  }, [navigation, loadListings]);
  if (loading) {
    return (
      <ActivityIndicator visible={true} size={"large"} color={colors.primary} />
    );
  }
  const handleRefresh = async () => {
    setRefreshing(true);
    await loadListings();
    setRefreshing(false);
  };
  return (
    <Screen>
      <View style={styles.screen}>
        <View style={styles.header}>
          <AppText
            style={{
              textAlign: "left",
              fontWeight: "bold",
              fontSize: 25,
              fontFamily: "Helvetica",
              fontStyle: "normal",
              flex: 1,
            }}
          >
            Quotes
          </AppText>
          <TouchableOpacity
            onPress={() => navigation.navigate("Add New Quote")}
          >
            <Icon name="plus" size={25} />
          </TouchableOpacity>
        </View>
        {error && (
          <View>
            <AppText>Couldn't retrieve the quotes.</AppText>
            <AppButton title="Retry" onPress={loadListings} />
          </View>
        )}
        <FlatList
          data={quotelistings}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ListItem
              title={item.author}
              subtitle={item.text}
              IconComponent={
                <Icon
                  size={50}
                  backgroundColor={colors.primary}
                  iconColor={colors.neutral}
                  name="quote-left"
                />
              }
            />
          )}
          ItemSeparatorComponent={ListItemSeparator}
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      </View>
    </Screen>
  );
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: colors.secondary,
  },
  header: {
    backgroundColor: colors.secondary,
    height: 40,
    alignItems: "center",
    marginLeft: 15,
    marginRight: 15,
    flexDirection: "row",
  },
});
export default AllQuotesScreen;

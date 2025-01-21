import React, { useContext, useEffect, useState } from "react";
import { StackActions } from "@react-navigation/native";
import {
  StyleSheet,
  View,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";

import ImageInput from "../components/ImageInput";
import colors from "../config/colors";
import Screen from "../components/Screen";
import ListItem from "../components/ListItem";
import ListItemSeparator from "../components/ListItemSeparator";
import Icon from "../components/Icon";
import { logoutUser } from "../api/authorization";
import useApi from "../hooks/useApi";
import AuthContext from "../auth/context";
const menuItems = [
  {
    title: "Favourites",
    icon: {
      name: "star",
      backgroundColor: colors.primary,
      iconColor: colors.neutral,
    },
  },
  {
    title: "Messages",
    icon: {
      name: "envelope",
      backgroundColor: colors.primary,
      iconColor: colors.neutral,
    },
  },
];
function AccountScreen({ navigation }) {
  const { user, setUser } = useContext(AuthContext);
  const { data, error, loading, request } = useApi(logoutUser);
  const handlePress = async () => {
    Alert.alert("Logout", "Are you sure you want to Logout?", [
      { text: "Yes", onPress: () => handleLogout() },
      { text: "No" },
    ]);
  };
  const handleLogout = async () => {
    const response = await request();
    if (response.ok) {
      setUser(null);
    } else {
      const errorMessage = response.data?.error || "Logout failed. Try again.";
      Alert.alert("Error", errorMessage);
    }
  };
  useEffect(() => {}, []);
  const [imageUri, setImageUri] = useState();
  return (
    <Screen>
      <View style={styles.container}>
        {user ? (
          <ListItem
            title={user.username}
            subtitle={user.email}
            ImageInput={
              <ImageInput
                iconName={"camera"}
                imageUri={imageUri}
                onChangeImage={setImageUri}
              />
            }
          />
        ) : (
          <ActivityIndicator size="large" color={colors.primary} />
        )}
      </View>
      <View style={styles.container}>
        <FlatList
          data={menuItems}
          keyExtractor={(menuItem) => menuItem.title}
          ItemSeparatorComponent={ListItemSeparator}
          renderItem={({ item }) => (
            <ListItem
              title={item.title}
              IconComponent={
                <Icon
                  name={item.icon.name}
                  backgroundColor={item.icon.backgroundColor}
                  iconColor={item.icon.iconColor}
                />
              }
            />
          )}
        />
      </View>
      <TouchableOpacity onPress={handlePress}>
        <ListItem
          title={"Logout"}
          IconComponent={
            <Icon
              name="sign-out-alt"
              iconColor={colors.neutral}
              backgroundColor="#d23336"
            />
          }
        />
      </TouchableOpacity>
    </Screen>
  );
}
const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
});
export default AccountScreen;

import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TouchableOpacity } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import colors from "../config/colors";
import Home from "../screens/Home";
import AllQuotesScreen from "../screens/AllQuotesScreen";
import AccountScreen from "../screens/AccountScreen";
import QuotesNavigator from "./QuotesNavigator";

const Tab = createBottomTabNavigator();
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.neutral,
        tabBarActiveBackgroundColor: colors.secondary,
        tabBarInactiveBackgroundColor: colors.secondary,
        tabBarShowLabel: false,
        headerStyle: {
          backgroundColor: colors.secondary,
        },
        headerTintColor: colors.neutral,
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 25,
        },
        headerTitleAlign: "left",
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Quotes"
        component={QuotesNavigator}
        options={({ navigation }) => ({
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="feather-alt" size={size} color={color} />
          ),
          headerShown: false,
        })}
      />
      <Tab.Screen
        name="Profile"
        component={AccountScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="user-alt" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default TabNavigator;

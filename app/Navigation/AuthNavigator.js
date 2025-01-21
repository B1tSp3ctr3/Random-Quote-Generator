import { createStackNavigator } from "@react-navigation/stack";

import TabNavigator from "./TabNavigator";
import WelcomeScreen from "../screens/WelcomeScreen";
import LoginScreen from "../screens/LoginScreen";
import colors from "../config/colors";
import RegisterScreen from "../screens/RegisterScreen";
import NewQuoteScreen from "../screens/NewQuoteScreen";
const Stack = createStackNavigator();
export default function AuthNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.secondary,
          elevation: 0, // Removes shadow on Android
          shadowOpacity: 0, // Removes shadow on iOS
        },
      }}
    >
      <Stack.Screen
        name=" "
        component={WelcomeScreen}
        options={{ headerLeft: () => null }}
      />
      <Stack.Screen
        name="Home"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}

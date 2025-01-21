import { createStackNavigator } from "@react-navigation/stack";
import AllQuotesScreen from "../screens/AllQuotesScreen";
import NewQuoteScreen from "../screens/NewQuoteScreen";
import colors from "../config/colors";
const stack = createStackNavigator();
export default function QuotesNavigator() {
  return (
    <stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.secondary,
          elevation: 0, // Removes shadow on Android
          shadowOpacity: 0, // Removes shadow on iOS
        },
      }}
    >
      <stack.Screen
        name="Quotes"
        component={AllQuotesScreen}
        options={{ headerShown: false }}
      />
      <stack.Screen name="Add New Quote" component={NewQuoteScreen} />
    </stack.Navigator>
  );
}

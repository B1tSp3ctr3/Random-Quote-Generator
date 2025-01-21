import { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";

import AuthContext from "./app/auth/context";
import Screen from "./app/components/Screen";
import navigationTheme from "./app/Navigation/navigationTheme";
import TabNavigator from "./app/Navigation/TabNavigator";
import AuthNavigator from "./app/Navigation/AuthNavigator";
export default function App() {
  const [user, setUser] = useState();
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Screen>
        <NavigationContainer theme={navigationTheme}>
          {user ? <TabNavigator /> : <AuthNavigator />}
        </NavigationContainer>
      </Screen>
    </AuthContext.Provider>
  );
}
// export default function App() {
//   return <NewQuoteScreen />;
// }

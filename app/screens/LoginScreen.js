import React, { useContext } from "react";
import { StyleSheet, Image, View, Alert } from "react-native";
import * as Yup from "yup";

import colors from "../config/colors";
import Screen from "../components/Screen";
import {
  AppFormField as FormField,
  SubmitButton,
  AppForm as Form,
} from "../components/Forms";
import { loginUser } from "../api/authorization";
import useApi from "../hooks/useApi";
import AuthContext from "../auth/context";
const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(6).label("Password"),
});
function LoginScreen({ navigation }) {
  const authContext = useContext(AuthContext);
  const { data: user, error, loading, request: loadUser } = useApi(loginUser);
  const handleSubmit = async (credentials) => {
    const response = await loadUser(credentials);
    if (response.ok) {
      const user = response.data.user;
      console.log(user);
      authContext.setUser(user);
      return navigation.navigate("Home");
    } else {
      const errorMessage = response.user?.error || "Login failed. Try again.";
      Alert.alert("Error", errorMessage);
    }
  };
  return (
    <Screen>
      <Image style={styles.logo} source={require("../assets/logo.png")} />
      <Form
        initialValues={{ email: "", password: "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <View style={styles.container}>
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="envelope"
            placeholder="Email"
            keyboardType="email-address"
            textContentType="emailAddress"
            name={"email"}
          />
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="key"
            placeholder="Password"
            textContentType="password"
            secureTextEntry
            name={"password"}
          />
          <SubmitButton title={"Login"} />
        </View>
      </Form>
    </Screen>
  );
}
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
  logo: {
    width: 300,
    height: 200,
    resizeMode: "contain",
    marginBottom: 20,
    marginTop: 50,
    alignSelf: "center",
  },
});
export default LoginScreen;

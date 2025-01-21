import React, { use, useContext, useEffect } from "react";
import {
  StyleSheet,
  Image,
  View,
  Alert,
  ActivityIndicator,
} from "react-native";
import * as Yup from "yup";

import useApi from "../hooks/useApi";
import { registerUser } from "../api/authorization";
import colors from "../config/colors";
import Screen from "../components/Screen";
import {
  AppFormField as FormField,
  SubmitButton,
  AppForm as Form,
} from "../components/Forms";
import AuthContext from "../auth/context";
const validationSchema = Yup.object().shape({
  username: Yup.string().required().label("Username"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(6).label("Password"),
});
function RegisterScreen({ navigation }) {
  const authContext = useContext(AuthContext);
  const {
    data: user,
    error,
    loading,
    request: loadUser,
  } = useApi(registerUser);
  const handleSubmit = async (credentials) => {
    const response = await loadUser(credentials);
    if (response.ok) {
      const user = response.data?.user;
      console.log(user);
      authContext.setUser(user);
      navigation.navigate("Home");
      return Alert.alert("User registered successfully.");
    } else {
      const errorMessage =
        response.user?.error || "Registration failed. Try again.";
      Alert.alert("Error", errorMessage);
    }
  };

  // const handleSubmit = async (credentials) => {
  //   navigation.navigate("Home");
  // };
  return (
    <Screen>
      <Image style={styles.logo} source={require("../assets/logo.png")} />
      {loading && <ActivityIndicator size="large" color={colors.primary} />}
      <Form
        initialValues={{ username: "", email: "", password: "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <View style={styles.container}>
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="user-alt"
            placeholder="Username"
            name={"username"}
          />
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
          <SubmitButton title={"Register"} />
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
export default RegisterScreen;

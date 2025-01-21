import React, { useState } from "react";
import { Alert, StyleSheet, View, ActivityIndicator } from "react-native";
import * as Yup from "yup";
import { Formik } from "formik";

import useApi from "../hooks/useApi";
import { addQuote } from "../api/quotelistings";
import Screen from "../components/Screen";
import {
  AppFormField as FormField,
  SubmitButton,
  AppForm as Form,
} from "../components/Forms";
import AppText from "../components/Text";
import colors from "../config/colors";
const validationSchema = Yup.object().shape({
  text: Yup.string().required().label("Quote"),
  author: Yup.string().required().label("Author"),
});
function NewQuoteScreen({ route }) {
  const { data: quote, error, loading, request: loadQuote } = useApi(addQuote);
  const handleSubmit = async (quote, { resetForm }) => {
    await loadQuote(quote);
    Alert.alert("Quote saved successfully.");
    resetForm({ values: { text: "", author: "" } });
  };
  return (
    <Screen style={styles.container}>
      {loading && <ActivityIndicator size="large" color={colors.primary} />}
      <Form
        initialValues={{ text: "", author: "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <View style={styles.field}>
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="feather-alt"
            placeholder="Author"
            name={"author"}
          />
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="quote-right"
            placeholder="Quote"
            name={"text"}
          />
          <SubmitButton title={loading ? "Submitting..." : "Add Quote"} />
          {error && <AppText style={{ color: "red" }}>{error}</AppText>}
        </View>
      </Form>
    </Screen>
  );
}
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  field: {
    marginHorizontal: 10,
    position: "relative",
    width: "90%",
  },
});
export default NewQuoteScreen;

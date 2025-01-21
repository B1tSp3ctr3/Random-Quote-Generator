import React from "react";
import { useFormikContext } from "formik";

import colors from "../../config/colors";
import AppButton from "../Button";
function SubmitButton({ title }) {
  const { handleSubmit } = useFormikContext();
  return (
    <AppButton
      title={title}
      onPress={handleSubmit}
      underlayColor={colors.underlayprimary}
    />
  );
}

export default SubmitButton;

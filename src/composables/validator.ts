import { required as requiredRule } from "@vee-validate/rules";
import { toFieldValidator } from "@vee-validate/zod";
import { defineRule } from "vee-validate";
import * as z from "zod";

export const useValidator = () => {
  const emailRule = toFieldValidator(
    z
      .string({ required_error: "Required field" })
      .email("The email format is invalid")
  );

  defineRule("required", (val: unknown) =>
    requiredRule(val) ? true : "Required field"
  );

  return { emailRule };
};

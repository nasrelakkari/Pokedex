import { required as requiredRule } from "@vee-validate/rules";
import { toFieldValidator } from "@vee-validate/zod";
import { defineRule } from "vee-validate";
import * as z from "zod";
import { ZodSchema } from "zod";

export const useValidator = () => {
  const emailRule = toFieldValidator(
    z
      .string({ required_error: "Champ obligatoire" })
      .email("Le format de l'email est invalide")
  );

  defineRule("required", (val: unknown) =>
    requiredRule(val) ? true : "Champ obligatoire"
  );

  return { emailRule };
};

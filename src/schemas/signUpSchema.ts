import { z } from "zod";

export const fullNameValidation = z
  .string()
  .min(3, "Full name is required (at least 3 characters)")
  .max(20, "Full name must be 20 characters or fewer")
  .regex(
    /^[a-zA-Z]+(?: [a-zA-Z]+)*$/,
    "Full name should only contain letters and spaces (no numbers or symbols)"
  );

export const emailValidation = z
  .string()
  .email("Please enter a valid email address")
  .transform((val) => val.toLowerCase().trim());

export const signUpSchema = z.object({
  fllname: fullNameValidation,
  email: emailValidation,
});

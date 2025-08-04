import { z } from "zod";
import { passwordValidation } from "./passwordSchema";

export const signInSchema = z.object({
  identifier: z.string(),
  password: passwordValidation,
});

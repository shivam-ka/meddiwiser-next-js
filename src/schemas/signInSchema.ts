import { z } from "zod";

export const signInSchema = z.object({
  identifier: z.string().min(3, "Enter Vlid Email or Phone"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

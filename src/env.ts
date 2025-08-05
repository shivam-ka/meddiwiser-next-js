import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    MONGODB_URI: z.string().url(),
    RESEND_API_KEY: z.string(),
    NEXTAUTH_SECRET: z.string(),
  },

  runtimeEnv: {
    MONGODB_URI: process.env.MONGODB_URI,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  },
});

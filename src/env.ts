import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    MONGODB_URI: z.string().url(),
    RESEND_API_KEY: z.string(),
    NEXTAUTH_SECRET: z.string(),
    IMAGEKIT_PRIVATE_KEY: z.string(),
  },

  client: {
    NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY: z.string(),
    NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT: z.string().url(),
  },

  runtimeEnv: {
    MONGODB_URI: process.env.MONGODB_URI,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    IMAGEKIT_PRIVATE_KEY: process.env.IMAGEKIT_PRIVATE_KEY,
    NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY:
      process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
    NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT:
      process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT,
  },
});

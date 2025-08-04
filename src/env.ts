import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    MONGODB_URI: z.string().url(),
  },

  runtimeEnv: {
    MONGODB_URI: process.env.MONGODB_URI,
  },
});

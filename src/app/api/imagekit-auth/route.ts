import { env } from "@/env";
import { getUploadAuthParams } from "@imagekit/next/server";

export async function GET() {
  try {
    const authenticationParameters = getUploadAuthParams({
      privateKey: env.IMAGEKIT_PRIVATE_KEY,
      publicKey: env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY as string,
    });

    return Response.json({
      authenticationParameters,
      publicKey: env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
    });
  } catch (error: any) {
    Response.json(
      {
        success: false,
        mussage: error.message || "Image Kit Authentication error",
      },
      {
        status: 500,
      }
    );
  }
}

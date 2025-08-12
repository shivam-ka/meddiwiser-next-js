import { getToken } from "next-auth/jwt";
import { NextResponse, NextRequest } from "next/server";
export { default } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;

  if (
    token &&
    (url.pathname.startsWith("/sign-in") || url.pathname.startsWith("/sign-up"))
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (url.pathname.startsWith("/doctor")) {
    if (!token) return NextResponse.redirect(new URL("/sign-in", request.url));

    if (token.role !== "doctor")
      return NextResponse.redirect(new URL("/sign-in", request.url));
  }
}

export const config = {
  matcher: [
    "/sign-in",
    "/sign-up",
    "/doctor/:path*",
    "/dashboard/:path*",
  ],
};

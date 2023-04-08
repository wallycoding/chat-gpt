import { withAuth } from "next-auth/middleware";
import { NextURL } from "next/dist/server/web/next-url";
import { NextResponse } from "next/server";

export default withAuth(
  (req) => {
    if (req.nextUrl.pathname === "/")
      return NextResponse.redirect(new NextURL("/chat", req.nextUrl));
  },
  {
    callbacks: {
      authorized({ token }) {
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ["/", "/chat/:path*"],
};

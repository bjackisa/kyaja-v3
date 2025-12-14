import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Toggle via env var so you can switch back without changing routes/components.
  // Example: HOME_REDIRECT_PATH=/d/gift-hampers
  const redirectPath = process.env.HOME_REDIRECT_PATH;

  if (pathname === "/" && redirectPath) {
    const url = req.nextUrl.clone();
    url.pathname = redirectPath;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Run only on page routes; exclude next internals and API.
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};

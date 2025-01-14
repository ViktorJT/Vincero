import { locales, defaultLocale } from "@vincero/languages-config";
import { NextResponse } from "next/server";

import type { Locale } from "@vincero/languages-config";
import type { NextRequest } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // If the request is for a public file (assets, etc), skip middleware
  if (PUBLIC_FILE.test(pathname)) return;

  // If the pathname is api route, skip middleware
  if (pathname.startsWith("/api")) return;

  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;

  const preferredLocale =
    cookieLocale && locales.includes(cookieLocale as Locale)
      ? cookieLocale
      : defaultLocale;

  console.log(preferredLocale, pathname);

  // if (preferredLocale !== defaultLocale) {
  //   return NextResponse.redirect(
  //     new URL(
  //       `/${preferredLocale}${pathname === "/" ? "" : pathname}`,
  //       request.url,
  //     ),
  //   );
  // }

  return NextResponse.next();
}

export const config = {
  // Only run middleware on navigation routes, skip for static files
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

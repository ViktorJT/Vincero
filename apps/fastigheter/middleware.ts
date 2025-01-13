import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { locales, defaultLocale } from "@vincero/languages-config";

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // If the request is for a public file (assets, etc), skip middleware
  if (PUBLIC_FILE.test(pathname)) return;

  // If the pathname is api route, skip middleware
  if (pathname.startsWith("/api")) return;

  // Check if the pathname already includes a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (!pathnameHasLocale) {
    // Get locale from cookie or use default
    const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
    const preferredLocale =
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cookieLocale && locales.includes(cookieLocale as any)
        ? cookieLocale
        : defaultLocale;

    // Only redirect if not default locale
    if (preferredLocale !== defaultLocale) {
      // Create new URL with locale prefix
      return NextResponse.redirect(
        new URL(
          `/${preferredLocale}${pathname === "/" ? "" : pathname}`,
          request.url,
        ),
      );
    } else {
      return NextResponse.redirect(
        new URL(
          `/${defaultLocale}${pathname === "/" ? "" : pathname}`,
          request.url,
        ),
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  // Only run middleware on navigation routes, skip for static files
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

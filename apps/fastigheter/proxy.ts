import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

// The URL decides the language: Swedish (default) has no prefix, English
// lives under /en. Redirect explicit /sv/... URLs to their unprefixed form.
export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  url.pathname = url.pathname.replace(/^\/sv(?=\/|$)/, "") || "/";

  return NextResponse.redirect(url, 308);
}

export const config = {
  matcher: ["/sv", "/sv/:path*"],
};

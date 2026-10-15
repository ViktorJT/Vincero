export { proxy } from "@vincero/site/proxy";

export const config = {
  // Everything except API routes, Next internals and files with an extension
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};

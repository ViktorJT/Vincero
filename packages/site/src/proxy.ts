import createMiddleware from "next-intl/middleware";

import { routing } from "@vincero/languages-config/routing";

// Maps unprefixed URLs to Swedish, redirects /sv/... to unprefixed and adds
// hreflang alternate links for search engines
export const proxy = createMiddleware(routing);

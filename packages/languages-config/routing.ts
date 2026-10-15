import { defineRouting } from "next-intl/routing";

// Swedish has no URL prefix, English lives under /en. The URL alone decides
// the language: no browser-language detection and no locale cookie.
export const routing = defineRouting({
  locales: ["sv", "en"],
  defaultLocale: "sv",
  localePrefix: "as-needed",
  localeDetection: false,
  localeCookie: false,
});

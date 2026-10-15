import { routing } from "./routing";

export const locales = routing.locales;
export const defaultLocale = routing.defaultLocale;

export type Locale = (typeof locales)[number];

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

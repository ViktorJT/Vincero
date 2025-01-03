export const locales = ["sv", "en"] as const;
export const defaultLocale: Locale = "sv";

export type Locale = (typeof locales)[number];

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

export type Locale = (typeof locales)[number];

export const locales = ["sv", "en"] as const;
export const defaultLocale: Locale = "sv";

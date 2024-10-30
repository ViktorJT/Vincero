import type { Event } from "@sentry/nextjs";

export const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN || "";

type SentryConfig = {
  dsn: string;
  environment: string;
  debug?: boolean;
};

export function createSentryConfig({
  dsn = SENTRY_DSN,
  environment,
  debug = false,
}: SentryConfig) {
  return {
    dsn,
    environment,
    debug,
    tracesSampleRate: environment === "production" ? 0.2 : 1.0,
    replaysSessionSampleRate: environment === "production" ? 0.1 : 1.0,
    replaysOnErrorSampleRate: 1.0,
    integrations: ["BrowserTracing", "Replay"],
    beforeSend(event: Event) {
      if (event.user) {
        delete event.user.email;
        delete event.user.name;
      }
      return event;
    },
  };
}

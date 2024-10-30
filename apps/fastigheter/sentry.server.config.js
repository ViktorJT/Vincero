import { createSentryConfig } from "@vincero/sentry-config";

Sentry.init(
  createSentryConfig({
    environment: process.env.NEXT_PUBLIC_ENVIRONMENT,
  }),
);

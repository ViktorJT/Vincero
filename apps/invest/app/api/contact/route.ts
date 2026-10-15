import { createContactHandler } from "@vincero/site/routes/contact";

// TODO: verify an invest sending domain in Resend before launch
export const POST = createContactHandler({
  from: "Vincero Fastigheter <noreply@vincerofastigheter.se>",
  to: ["info@vincero.se"],
});

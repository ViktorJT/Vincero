import { createContactHandler } from "@vincero/site/routes/contact";

export const POST = createContactHandler({
  from: "Vincero Fastigheter <noreply@vincerofastigheter.se>",
  to: ["info@vincero.se"],
});

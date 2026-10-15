import { createHmac, timingSafeEqual } from "node:crypto";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

const SECRET = process.env.HYGRAPH_WEBHOOK_SECRET;

// Verifies the `gcms-signature` header Hygraph sends with signed webhooks:
// "sign=<base64>, env=<environment>, t=<timestamp>"
// https://hygraph.com/docs/api-reference/basics/webhooks
const isValidSignature = (body: string, header: string, secret: string) => {
  const [rawSign, rawEnv, rawTimestamp] = header.split(", ");

  if (!rawSign || !rawEnv || !rawTimestamp) return false;

  const sign = rawSign.replace("sign=", "");
  const payload = JSON.stringify({
    Body: body,
    EnvironmentName: rawEnv.replace("env=", ""),
    TimeStamp: parseInt(rawTimestamp.replace("t=", ""), 10),
  });
  const hash = createHmac("sha256", secret).update(payload).digest("base64");

  const a = Buffer.from(sign);
  const b = Buffer.from(hash);

  return a.length === b.length && timingSafeEqual(a, b);
};

// Called by a Hygraph webhook on publish/unpublish/delete. Marks every page
// as stale so the next visit regenerates it with fresh content.
export async function POST(req: Request) {
  if (!SECRET) {
    console.error("HYGRAPH_WEBHOOK_SECRET is not defined");
    return NextResponse.json({ error: "Not configured" }, { status: 500 });
  }

  const body = await req.text();
  const signature = req.headers.get("gcms-signature") ?? "";

  if (!isValidSignature(body, signature, SECRET)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  revalidatePath("/", "layout");

  return NextResponse.json({ revalidated: true, now: Date.now() });
}

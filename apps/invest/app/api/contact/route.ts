import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { message } = body;

    const emailResponse = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: ["v.jensentorp@gmail.com"],
      subject: "New Contact Form Submission",
      text: message,
    });

    if (emailResponse.error) {
      console.error(emailResponse.error);
      return NextResponse.json(
        { error: emailResponse.error.message || "Failed to send email" },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 },
    );
  }
}

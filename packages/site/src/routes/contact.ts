import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

type ContactOptions = {
  from: string;
  to: string[];
};

// Each app creates its contact route with its own sender and recipients
export const createContactHandler =
  ({ from, to }: ContactOptions) =>
  async (req: Request) => {
    try {
      const body = await req.json();

      const { message } = body;

      const emailResponse = await resend.emails.send({
        from,
        to,
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
  };

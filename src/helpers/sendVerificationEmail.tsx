import { resend } from "@/lib/resend";
import VerifyEmail from "../../email/VerifyEmail";

interface sendVerificationEmailProps {
  email: string;
  fullname: string;
  verificationCode: string;
}

export default async function sendVerificationEmail({
  email,
  fullname,
  verificationCode,
}: sendVerificationEmailProps) {
  const response = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "meddiwiser | Verify Code",
    react: VerifyEmail({ fullname, verificationCode }),
  });

  return response;
}

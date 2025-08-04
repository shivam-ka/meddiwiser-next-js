import { resend } from "@/lib/resend";
import type { NextApiRequest, NextApiResponse } from "next";
import VerifyEmail from "../../email/VerifyEmail";

interface sendVerificationEmailProps {
  email: string;
  fullname: string;
  verificationCode: string;
}

export default async function sendVerificationEmail(
  req: NextApiRequest,
  res: NextApiResponse,
  { email, fullname, verificationCode }: sendVerificationEmailProps
) {
  const { data, error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "meddiwiser | Verify Code",
    react: VerifyEmail({ fullname, verificationCode }),
  });

  if (error) {
    return res.status(400).json(error);
  }

  res.status(200).json(data);
}

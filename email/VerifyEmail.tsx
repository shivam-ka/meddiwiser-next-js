import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Section,
  Text,
  Link,
  Preview,
} from "@react-email/components";

interface VerifyEmailProps {
  fullname?: string;
  verificationCode?: string;
}

export default function VerifyEmail({
  fullname,
  verificationCode,
}: VerifyEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Meddiwiser Email Verification</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={headerSection}>
            <Heading style={h1}>Meddiwiser</Heading>
            <Text style={subheader}>Your Trusted Medical Advisor</Text>
          </Section>

          <Section style={contentSection}>
            <Heading style={h2}>Verify your email address</Heading>
            <Text style={greetingText}>Dear {fullname},</Text>
            <Text style={mainText}>
              Thank you for choosing Meddiwiser. To complete your account setup,
              please use the following verification code:
            </Text>

            <Section style={verificationSection}>
              <Text style={verifyText}>Your Verification Code</Text>
              <Text style={codeText}>{verificationCode}</Text>
              <Text style={validityText}>
                (This code is valid for 60 minutes)
              </Text>
            </Section>

            <Text style={secondaryText}>
              {`If you didn't request this code, you can safely ignore this email.`}
            </Text>
          </Section>

          <Hr style={divider} />

          <Section style={footerSection}>
            <Text style={footerText}>
              This message was sent by Meddiwiser, your trusted healthcare
              partner.
            </Text>
            <Text style={footerSmallText}>
              © {new Date().getFullYear()} Meddiwiser. All rights reserved.
            </Text>
            <Text style={footerLinks}>
              <Link href="https://meddiwiser.com/privacy" style={link}>
                Privacy Policy
              </Link>{" "}
              |{" "}
              <Link href="https://meddiwiser.com/terms" style={link}>
                Terms of Service
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// Styles
const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif",
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "0",
  maxWidth: "600px",
  borderRadius: "8px",
  overflow: "hidden",
  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
};

const headerSection = {
  backgroundColor: "#2563eb",
  padding: "30px 40px",
  textAlign: "center" as const,
  color: "#ffffff",
};

const h1 = {
  fontSize: "28px",
  fontWeight: "bold",
  margin: "0 0 5px 0",
  color: "#ffffff",
};

const subheader = {
  fontSize: "16px",
  margin: "0",
  opacity: "0.9",
};

const contentSection = {
  padding: "40px",
};

const h2 = {
  fontSize: "22px",
  fontWeight: "bold",
  margin: "0 0 20px 0",
  color: "#1a237e",
};

const greetingText = {
  fontSize: "16px",
  lineHeight: "1.5",
  margin: "0 0 20px 0",
};

const mainText = {
  fontSize: "16px",
  lineHeight: "1.5",
  margin: "0 0 20px 0",
};

const secondaryText = {
  fontSize: "14px",
  lineHeight: "1.5",
  margin: "20px 0 0 0",
  color: "#666",
};

const verificationSection = {
  backgroundColor: "#f0f7ff",
  borderRadius: "8px",
  padding: "20px",
  margin: "30px 0",
  textAlign: "center" as const,
};

const verifyText = {
  fontSize: "14px",
  fontWeight: "bold",
  margin: "0 0 10px 0",
  color: "#2563eb",
};

const codeText = {
  fontSize: "32px",
  fontWeight: "bold",
  letterSpacing: "2px",
  margin: "10px 0",
  color: "#1a237e",
};

const validityText = {
  fontSize: "12px",
  margin: "10px 0 0 0",
  color: "#666",
};

const divider = {
  borderColor: "#e0e6ed",
  margin: "0",
};

const footerSection = {
  padding: "20px 40px",
  textAlign: "center" as const,
};

const footerText = {
  fontSize: "14px",
  lineHeight: "1.5",
  margin: "0 0 10px 0",
  color: "#666",
};

const footerSmallText = {
  fontSize: "12px",
  lineHeight: "1.5",
  margin: "0 0 10px 0",
  color: "#999",
};

const footerLinks = {
  fontSize: "12px",
  lineHeight: "1.5",
  margin: "0",
};

const link = {
  color: "#2563eb",
  textDecoration: "none",
};

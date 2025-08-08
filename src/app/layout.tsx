import type { Metadata } from "next";
import "./globals.css";
import AuthProvider from "@/context/AuthProvider";
import { fontVariables } from "@/config/font";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { env } from "@/env";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";

const baseUrl = env.NEXT_PUBLIC_BASE_URL;

export const metadata: Metadata = {
  title: {
    template: "%s | MeddiWiser - Book Doctor Appointments Online",
    default: "MeddiWiser - Book Doctor Appointments Online",
  },
  description:
    "MeddiWiser is your trusted platform for booking doctor appointments online. Find top-rated specialists, view availability, and schedule consultations in minutes.",
  openGraph: {
    title: "MeddiWiser - Book Doctor Appointments Online",
    description:
      "Find and book doctor appointments online with MeddiWiser. Quick, easy, and reliable access to healthcare professionals.",
    images: [
      {
        url: `${baseUrl}/og-image.jpg`,
        width: 1100,
        height: 630,
        alt: "MeddiWiser - Book Doctor Appointments Online",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [`${baseUrl}/og-image.jpg`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <AuthProvider>
        <body className={`${fontVariables} antialiased`}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Navbar />
            {children}
            <Footer />
            <Toaster position="top-center" />
          </ThemeProvider>
        </body>
      </AuthProvider>
    </html>
  );
}

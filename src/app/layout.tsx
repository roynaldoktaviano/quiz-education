import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EdukaQuiz - Game Edukasi SMA Warga Surakarta",
  description: "EdukaQuiz menghadirkan game quiz edukatif dari SMA Warga Surakarta. Asah pengetahuanmu, kenali sekolah, dan raih skor tertinggi dengan cara yang seru dan interaktif!",
  authors: [{ name: "SMA Warga Surakarta" }],
  openGraph: {
    title: "EdukaQuiz - Game Edukasi SMA Warga Surakarta",
    description: "EdukaQuiz menghadirkan game quiz edukatif dari SMA Warga Surakarta. Asah pengetahuanmu, kenali sekolah, dan raih skor tertinggi dengan cara yang seru dan interaktif!",
    siteName: "SMA Warga Surakarta",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EdukaQuiz - Game Edukasi SMA Warga Surakarta",
    description: "EdukaQuiz menghadirkan game quiz edukatif dari SMA Warga Surakarta. Asah pengetahuanmu, kenali sekolah, dan raih skor tertinggi dengan cara yang seru dan interaktif!",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}

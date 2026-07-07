import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import { Providers } from "./providers";
import { Toaster } from "../components/ui/toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "FISTO | Modern Premium E-Commerce Experience",
    template: "%s | FISTO Store",
  },
  description: "Explore FISTO's curated premium collection. Highly performant, design-forward, accessibility-first online shopping experience.",
  metadataBase: new URL("https://fisto-ecommerce.vercel.app"),
  openGraph: {
    title: "FISTO | Modern Premium E-Commerce Experience",
    description: "Explore FISTO's curated premium collection. Highly performant, design-forward, accessibility-first online shopping experience.",
    url: "https://fisto-ecommerce.vercel.app",
    siteName: "FISTO Store",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FISTO | Modern Premium E-Commerce Experience",
    description: "Explore FISTO's curated premium collection. Highly performant, design-forward, accessibility-first online shopping experience.",
    creator: "@fisto_store",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import { Providers } from "./providers";
import { Toaster } from "../components/ui/toast";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  display: "swap",
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
  metadataBase: new URL("https://fisto-ecommerce-website-1.vercel.app"),
  openGraph: {
    title: "FISTO | Modern Premium E-Commerce Experience",
    description: "Explore FISTO's curated premium collection. Highly performant, design-forward, accessibility-first online shopping experience.",
    url: "https://fisto-ecommerce-website-1.vercel.app",
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
      className={`${plusJakartaSans.variable} ${geistMono.variable} h-full antialiased`}
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

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AppWalletProvider from "@/components/AppWalletProvider";
import { QueryProvider } from "@/components/QueryProvider";
import { CSPostHogProvider } from "@/components/PostHogProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ZyoPay | Automated Recurring Payments on Solana",
  description: "Next-generation automated recurring payments on Solana. Lightning-fast transactions with near-zero fees.",
  openGraph: {
    title: "ZyoPay | Recurring Payments on Solana",
    description: "Accept subscriptions and recurring payments in USDC on Solana. Non-custodial, low fees.",
    url: "https://zyopay.com",
    siteName: "ZyoPay",
    images: [
      {
        url: "https://zyopay.com/og-image.png", // Placeholder
        width: 1200,
        height: 630,
        alt: "ZyoPay Dashboard",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ZyoPay",
    description: "Automated Recurring Payments on Solana.",
    images: ["https://zyopay.com/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-black text-white antialiased overflow-x-hidden`} suppressHydrationWarning>
        <QueryProvider>
          <CSPostHogProvider>
            <AppWalletProvider>
              {children}
            </AppWalletProvider>
          </CSPostHogProvider>
        </QueryProvider>
      </body>
    </html>
  );
}

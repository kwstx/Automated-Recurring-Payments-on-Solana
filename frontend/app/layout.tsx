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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-black text-white antialiased overflow-x-hidden`}>
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

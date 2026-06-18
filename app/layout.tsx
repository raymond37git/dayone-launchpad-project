import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dayone Launchpad",
  description: "Dayone Launchpad",
  icons: { icon: "/cozy_leaf_logo.png" },
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
    >
      <body className="min-h-full flex flex-col">
        <header className="fixed top-0 left-0 z-50 p-4">
          <Link href="/" aria-label="Home">
            <Image
              src="/cozy_leaf_logo.png"
              alt="Home"
              width={48}
              height={48}
              className="transition-opacity hover:opacity-70"
            />
          </Link>
        </header>
        {children}
      </body>
    </html>
  );
}

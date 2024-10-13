import type { Metadata } from "next";
import Navbar from "./ui/navbar";
import { SessionProvider } from "next-auth/react";

import "./globals.css";
import { inter } from '@/src/app/ui/fonts';


export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

// export const experimental_ppr = true;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <SessionProvider>
        <div className="w-full flex">
          <Navbar />
        </div>
        <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
        </SessionProvider>
      </body>
    </html>
  );
}

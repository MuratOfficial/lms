import type { Metadata } from "next";
import {Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets:["cyrillic"]
});



export const metadata: Metadata = {
  title: "LMS Project ITC",
  description: "Учебный проект по Программированию",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
      >
        {children}
        
      </body>
    </html>
  );
}

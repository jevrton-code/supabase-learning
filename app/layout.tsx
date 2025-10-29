import type { Metadata } from "next";
import Link from "next/link";

import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Learning Supabase",
  description: "A simple CRUD to learn SUPABASE",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header className="shadow p-4 flex justify-between">
          <h1 className="text-xl font-bold">Supabase CRUD</h1>
          <nav className="flex gap-4">
            <Link href="/create">Create</Link>
            <Link href="/read">Read</Link>
            <Link href="/update">Update</Link>
            <Link href="/delete">Delete</Link>
          </nav>
        </header>

        <main className="p-8">{children}</main>
      </body>
    </html>
  );
}

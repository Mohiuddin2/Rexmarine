import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "@/components/Providers";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "REXMARINE Cargo - Fast & Reliable Shipping to the Caribbean",
  description:
    "Affordable, trusted shipping from the USA to Caribbean islands. Barrel shipping, air freight, ocean cargo, and door-to-door delivery to Jamaica, Trinidad, Barbados, and more.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}

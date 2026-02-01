import type { Metadata } from "next";
import { Press_Start_2P, Silkscreen, VT323 } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Web3Provider } from "@/providers/web3-provider";

const pressStart = Press_Start_2P({
  weight: "400",
  variable: "--font-press",
  subsets: ["latin"],
});

const silkscreen = Silkscreen({
  weight: ["400", "700"],
  variable: "--font-silk",
  subsets: ["latin"],
});

const vt323 = VT323({
  weight: "400",
  variable: "--font-vt",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Collective App",
  description: "Transparent, on-chain access to curated Pokémon vendor markets.",
  openGraph: {
    title: "Collective App",
    description: "Transparent, on-chain access to curated Pokémon vendor markets.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${pressStart.variable} ${silkscreen.variable} ${vt323.variable} antialiased`}
      >
        <Web3Provider>
          {children}
        </Web3Provider>
        <Analytics />
      </body>
    </html>
  );
}

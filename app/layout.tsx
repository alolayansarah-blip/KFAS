import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KFAS - Kuwait Foundation for the Advancement of Sciences",
  description: "Kuwait Foundation for the Advancement of Sciences",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/image/KFASLogo.png", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}

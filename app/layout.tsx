import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Физическая одиссея",
  description: "Учебная платформа по физике",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}

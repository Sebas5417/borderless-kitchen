import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Borderless Kitchen",
  description: "A premium cookbook series by Sebastian Dri.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

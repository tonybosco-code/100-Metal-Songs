import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "100 Metal Songs",
  description: "Songs that define Heavy Metal — weekly deep dives.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-black">
      <body className="min-h-full bg-gradient-to-b from-black via-zinc-950 to-black text-zinc-100 antialiased">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

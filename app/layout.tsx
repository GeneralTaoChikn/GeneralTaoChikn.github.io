import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Christopher Diasanta | Software Engineer",
  description:
    "Resume website for Christopher Diasanta, a software engineer focused on Java, Spring Boot, React, Vue, microservices, distributed systems, and performance engineering.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-background font-sans antialiased">{children}</body>
    </html>
  );
}

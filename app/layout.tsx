import type { Metadata } from "next";
import { Theme } from "@radix-ui/themes";
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
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const storedTheme = localStorage.getItem("theme");
                const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
                const theme = storedTheme === "dark" || storedTheme === "light"
                  ? storedTheme : (prefersDark ? "dark" : "light");
                document.documentElement.classList.toggle("dark", theme === "dark");
              } catch {
                /* Ignore unavailable storage or media-query APIs. */
              }
            `,
          }}
        />
      </head>
      <body>
        <Theme
          accentColor="indigo"
          grayColor="slate"
          radius="large"
          panelBackground="solid"
        >
          {children}
        </Theme>
      </body>
    </html>
  );
}

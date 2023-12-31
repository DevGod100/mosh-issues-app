import type { Metadata } from "next";
import "@radix-ui/themes/styles.css";
import { Container, Theme, ThemePanel } from "@radix-ui/themes";

import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./NavBar";
import AuthProvider from "./api/auth/Provider";
import QueryClientProvider from "./QueryClientProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Issue Tracker",
  description: "Track bugs in a beatiful layout",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <Theme appearance="light" accentColor="yellow"> */}
        <QueryClientProvider>
        <AuthProvider>
        {/* <Theme appearance="light" accentColor="iris"> */}
        <Theme appearance="light" accentColor="yellow" scaling="110%">
          <NavBar />
          <main className="p-5">
            <Container>{children}</Container>
          </main>
          {/* <ThemePanel /> */}
        </Theme>
        </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}

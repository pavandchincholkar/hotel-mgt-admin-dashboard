import type { Metadata } from "next";
import "./globals.css";
import LayoutClientWrapper from "@/components/layout/layout-client-wrapper";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `${siteConfig.name} | ${siteConfig.description}`,
  description: siteConfig.description,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased selection:bg-indigo-100 selection:text-indigo-600">
        <LayoutClientWrapper>{children}</LayoutClientWrapper>
      </body>
    </html>
  );
}
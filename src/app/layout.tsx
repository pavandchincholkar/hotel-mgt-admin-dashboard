"use client";

import "./globals.css";
import DashboardLayout from "@/components/layout/dashboard-layout";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";

  return (
    <html lang="en">
      <body className="antialiased">
        {isLoginPage ? (
          <div className="h-screen w-full">{children}</div>
        ) : (
          <DashboardLayout>{children}</DashboardLayout>
        )}
      </body>
    </html>
  );
}
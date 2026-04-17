"use client";

import { usePathname } from "next/navigation";
import DashboardLayout from "@/components/layout/dashboard-layout";

export default function LayoutClientWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";

  if (isLoginPage) {
    return <div className="h-screen w-full bg-[#f1f5f9]">{children}</div>;
  }

  return <DashboardLayout>{children}</DashboardLayout>;
}
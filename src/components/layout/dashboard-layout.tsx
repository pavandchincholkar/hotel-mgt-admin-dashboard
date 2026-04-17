"use client";

import { useEffect, useRef } from "react"; // 1. Add useEffect and useRef
import { Sidebar } from "./sidebar";
import { Header } from "./header";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const mainRef = useRef<HTMLElement>(null); // 2. Create a ref for the main container

  // 3. Reset scroll to top on every page change
  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTo(0, 0);
    }
  }, [pathname]);

  return (
    <div className="h-screen w-full bg-[#f1f5f9] flex items-center justify-center p-0 md:p-6 lg:p-8 relative overflow-hidden">
      {/* ... keep background blurs ... */}

      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-400 h-full bg-white/80 backdrop-blur-2xl rounded-none md:rounded-3xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-white overflow-hidden flex relative z-10"
      >
        <Sidebar />

        <div className="flex flex-col flex-1 h-full min-w-0">
          <Header />

          {/* 4. Attach the ref to the main element */}
          <main 
            ref={mainRef} 
            className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-8 custom-scrollbar bg-gray-50/40"
          >
            <motion.div
              key={pathname}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="min-h-full w-full"
            >
              {children}
            </motion.div>
          </main>
        </div>
      </motion.div>
    </div>
  );
}
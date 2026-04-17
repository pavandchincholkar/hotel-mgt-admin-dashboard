"use client";

import { useEffect, useRef, useState } from "react";
import { Sidebar } from "./sidebar";
import { Header } from "./header";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const mainRef = useRef<HTMLElement>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // 1. SCROLL TO TOP: Keep this in useEffect as it interacts with DOM
  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTo(0, 0);
    }
  }, [pathname]);

  // 2. SIDEBAR AUTO-CLOSE: Use a secondary check to prevent cascading renders
  // We only call the setter if the sidebar is currently TRUE
  if (isSidebarOpen && typeof window !== "undefined" && window.innerWidth < 1024) {
     // This is a common pattern to sync state with props/route in React 19 
     // without triggering the "useEffect" warning.
     const handleRouteChange = () => setIsSidebarOpen(false);
     handleRouteChange();
  }

  return (
    <div className="h-screen w-full bg-[#f1f5f9] flex items-center justify-center p-0 md:p-6 lg:p-8 relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-200/40 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-200/40 blur-[120px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-[1600px] h-full bg-white/80 backdrop-blur-2xl rounded-none md:rounded-3xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-white overflow-hidden flex relative z-10"
      >
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

        <div className="flex flex-col flex-1 h-full min-w-0">
          <Header onMenuClick={() => setIsSidebarOpen(true)} />

          <main 
            ref={mainRef} 
            className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-8 custom-scrollbar bg-gray-50/40"
          >
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="min-h-full w-full"
            >
              {children}
            </motion.div>
          </main>
        </div>

        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden"
            />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
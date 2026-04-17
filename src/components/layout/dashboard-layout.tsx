"use client";

import { useRef, useState, useLayoutEffect } from "react";
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
  const [prevPathname, setPrevPathname] = useState(pathname);

  // 1. SYNC STATE DURING RENDER
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setIsSidebarOpen(false);
  }

  // 2. THE CRITICAL FIX: RESET SCROLL ON NAVIGATION
  // This ensures that when you switch sections on mobile, 
  // you start at the top (where the Header is)
  useLayoutEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTo(0, 0); // Force scroll to top
    }
  }, [pathname]);

  return (
    <div className="h-screen w-full bg-[#f1f5f9] flex items-center justify-center p-0 md:p-6 lg:p-8 relative overflow-hidden">
      
      {/* Background Blurs */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-200/40 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-200/40 blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-400 h-full bg-white/80 backdrop-blur-2xl rounded-none md:rounded-3xl shadow-2xl border border-white flex relative z-10 overflow-hidden"
      >
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

        {/* This container must be flex-col and overflow-hidden to lock the header */}
        <div className="flex flex-col flex-1 h-full min-w-0 relative overflow-hidden">
          
          {/* Header: Physically placed above the scrollable area */}
          <Header onMenuClick={() => setIsSidebarOpen(true)} />

          {/* Main: The ONLY part that actually scrolls */}
          <main 
            ref={mainRef} 
            className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-8 custom-scrollbar bg-gray-50/40 relative z-0"
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
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-45 lg:hidden"
            />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
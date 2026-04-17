"use client";

import { useRef, useState, useLayoutEffect } from "react";
import { Sidebar } from "./sidebar";
import { Header } from "./header";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const mainRef = useRef<HTMLElement>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Track the previous path to detect navigation
  const [prevPath, setPrevPath] = useState(pathname);

  /** * THE REACT 19 FIX: 
   * We sync state during the render phase. If the path changes, 
   * we update the state IMMEDIATELY. This prevents the "cascading renders" error.
   */
  if (pathname !== prevPath) {
    setPrevPath(pathname);
    setIsSidebarOpen(false);
    
    // Reset browser viewport for mobile lifting bug
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
  }

  // Handle internal container scroll reset
  useLayoutEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTop = 0;
    }
  }, [pathname]);

  return (
    <div className={cn(
      "w-full bg-[#f1f5f9] selection:bg-indigo-100 overflow-hidden",
      "fixed inset-0 h-dvh overscroll-none", 
      "md:relative md:h-screen md:flex md:items-center md:justify-center md:p-6 lg:p-8"
    )}>
      
      {/* Background Blurs */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-200/40 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-200/40 blur-[120px]" />
      </div>

      <motion.div 
        key={pathname} 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full max-w-400 h-full bg-white/80 backdrop-blur-2xl rounded-none md:rounded-3xl shadow-2xl border border-white flex relative z-10 overflow-hidden"
      >
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

        <div className="flex flex-col flex-1 h-full min-w-0 relative overflow-hidden">
          <Header onMenuClick={() => setIsSidebarOpen(true)} />

          <main 
            ref={mainRef} 
            className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-8 custom-scrollbar bg-gray-50/40 relative z-0"
          >
            <div className="min-h-full w-full pb-10">
              {children}
            </div>
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
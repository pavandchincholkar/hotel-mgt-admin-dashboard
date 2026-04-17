"use client";

import { motion } from "framer-motion";
import { Sparkles, Home } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export default function NotFound() {
  return (
    <div className="h-screen w-full bg-[#f1f5f9] flex items-center justify-center p-4 sm:p-6 relative overflow-hidden antialiased">
      {/* Background Glows - Reduced opacity for cleaner mobile look */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-200/30 blur-[80px] sm:blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-200/30 blur-[80px] sm:blur-[120px]" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-lg text-center"
      >
        {/* Main Card - Adjusted padding for mobile (p-8) vs desktop (p-12) */}
        <div className="bg-white/80 backdrop-blur-2xl rounded-3xl sm:rounded-[3rem] p-8 sm:p-12 shadow-2xl border border-white mx-auto">
          <div className="flex justify-center mb-6">
            <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl sm:rounded-3xl bg-indigo-600 flex items-center justify-center shadow-xl rotate-12 transition-transform hover:rotate-0 duration-300">
              <Sparkles className="text-white w-8 h-8 sm:w-10 sm:h-10" />
            </div>
          </div>
          
          {/* Responsive Font Size: text-6xl on mobile, text-8xl on desktop */}
          <h1 className="text-6xl sm:text-8xl font-black text-slate-900 tracking-tighter mb-2">404</h1>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4 tracking-tight">Suite Not Found</h2>
          
          <p className="text-sm sm:text-base text-slate-500 mb-8 font-medium leading-relaxed">
            The page you are looking for in <span className="text-indigo-600 font-bold">{siteConfig.name}</span> has been moved or checked out early.
          </p>
          
          <div className="flex justify-center">
            <Link 
              href="/"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] sm:text-xs uppercase tracking-widest hover:bg-indigo-600 transition-all active:scale-95 shadow-xl shadow-indigo-100"
            >
              <Home size={18} /> Return Home
            </Link>
          </div>
        </div>
        
        {/* Version Footer - Fixed spacing for mobile */}
        <p className="mt-6 sm:mt-8 text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] sm:tracking-[0.3em] px-4">
          {siteConfig.name} {siteConfig.company} v{siteConfig.version}
        </p>
      </motion.div>
    </div>
  );
}
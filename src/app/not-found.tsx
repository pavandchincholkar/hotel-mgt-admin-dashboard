"use client";

import { motion } from "framer-motion";
import { Sparkles, Home } from "lucide-react"; // 🔥 Removed ArrowLeft
import Link from "next/link";
import { siteConfig } from "@/config/site";

export default function NotFound() {
  return (
    <div className="h-screen w-full bg-[#f1f5f9] flex items-center justify-center p-6 relative overflow-hidden antialiased">
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-200/40 blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-200/40 blur-[120px]" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 text-center"
      >
        <div className="bg-white/80 backdrop-blur-2xl rounded-[3rem] p-12 shadow-2xl border border-white max-w-lg">
          <div className="flex justify-center mb-6">
            <div className="h-20 w-20 rounded-3xl bg-indigo-600 flex items-center justify-center shadow-xl rotate-12">
              <Sparkles className="text-white w-10 h-10" />
            </div>
          </div>
          
          <h1 className="text-8xl font-black text-slate-900 tracking-tighter mb-2">404</h1>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Suite Not Found</h2>
          <p className="text-slate-500 mb-8 font-medium">
            The page you are looking for in <span className="text-indigo-600 font-bold">{siteConfig.name}</span> has been moved or checked out early.
          </p>
          
          <div className="flex gap-4 justify-center">
            <Link 
              href="/"
              className="flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-600 transition-all active:scale-95 shadow-xl"
            >
              <Home size={18} /> Return Home
            </Link>
          </div>
        </div>
        
        <p className="mt-8 text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">
          {siteConfig.name} {siteConfig.company} v{siteConfig.version}
        </p>
      </motion.div>
    </div>
  );
}
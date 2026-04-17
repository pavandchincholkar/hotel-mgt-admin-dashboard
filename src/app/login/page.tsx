"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Mail, Lock, ArrowRight, Loader2 } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function LoginPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "redirecting">("idle");

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // Now checking against siteConfig values
    if (email === siteConfig.auth.adminEmail && password === siteConfig.auth.adminPassword) {
      setStatus("loading");

      document.cookie = "auth_session=true; path=/; max-age=3600; SameSite=Lax"; 

      setTimeout(() => {
        setStatus("redirecting");
        window.location.href = "/"; 
      }, 1000);
    } else {
      alert(`Invalid Credentials! Try ${siteConfig.auth.adminEmail} / ${siteConfig.auth.adminPassword}`);
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center p-6 relative overflow-hidden bg-[#f1f5f9] antialiased">
      
      <AnimatePresence>
        {status === "redirecting" && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-white/60 backdrop-blur-xl flex flex-col items-center justify-center"
          >
            <div className="relative">
              <div className="h-24 w-24 rounded-3xl bg-indigo-600 animate-bounce shadow-2xl shadow-indigo-200 flex items-center justify-center">
                <Sparkles className="text-white w-10 h-10" />
              </div>
              <Loader2 className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-indigo-600 animate-spin" size={32} />
            </div>
            <p className="mt-16 text-sm font-black text-slate-900 uppercase tracking-[0.3em] animate-pulse">
              Initializing Suite...
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-200/40 blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-200/40 blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md z-10"
      >
        <div className="bg-white rounded-3xl p-10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-white">
          <div className="flex flex-col items-center mb-8">
            <div className="h-14 w-14 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg mb-4 shadow-indigo-200">
              <Sparkles className="text-white" size={28} />
            </div>
            <h1 className="text-2xl font-black text-gray-900 tracking-tighter">
              {siteConfig.name} <span className="text-indigo-600">{siteConfig.company}</span>
            </h1>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
                <input 
                  name="email" 
                  type="email" 
                  required 
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-600 transition-all text-gray-900 font-bold text-sm" 
                  placeholder={siteConfig.auth.adminEmail} 
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
                <input 
                  name="password" 
                  type="password" 
                  required 
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-600 transition-all text-gray-900 font-bold text-sm" 
                  placeholder="••••••••" 
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={status !== "idle"} 
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black py-4 rounded-xl shadow-xl shadow-indigo-100 transition-all active:scale-95 flex items-center justify-center gap-2 group"
            >
              {status === "loading" ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>Sign In <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></>
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
"use client";

import { useState, useRef, useEffect } from "react";
import { Bell, Search, Menu, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function Header({ onMenuClick }: { onMenuClick: () => void }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSignOut = () => {
    document.cookie = "auth_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    window.location.href = "/login";
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="shrink-0 w-full h-20 px-4 md:px-8 flex items-center justify-between bg-white md:bg-white/40 backdrop-blur-md border-b border-slate-200 z-40 relative">
      <div className="flex items-center gap-4">
        <button 
          onClick={(e) => { e.stopPropagation(); onMenuClick(); }}
          className="lg:hidden p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 active:bg-slate-100 z-50 cursor-pointer"
        >
          <Menu size={22} />
        </button>

        <div className="flex-1 max-w-md hidden sm:block">
          <div className="group flex items-center gap-3 bg-gray-200/50 px-4 py-2.5 rounded-2xl border border-transparent focus-within:border-indigo-300 focus-within:bg-white transition-all duration-300">
            <Search size={18} className="text-gray-400 group-focus-within:text-indigo-500" />
            <input placeholder="Search..." className="bg-transparent outline-none text-sm text-gray-800 w-full" />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-6">
        <button className="relative p-2.5 rounded-xl bg-white border border-slate-200 text-gray-500">
          <Bell size={20} />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
        </button>

        <div className="h-8 w-px bg-slate-200 mx-1 md:mx-2" />

        <div className="relative" ref={dropdownRef}>
          <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center gap-2 md:gap-3 group transition-all">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{siteConfig.user.name}</p>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{siteConfig.user.role}</p>
            </div>
            <div className="h-10 w-10 md:h-11 md:w-11 rounded-2xl bg-linear-to-tr from-indigo-500 to-purple-500 p-0.5 shadow-lg">
               <div className="h-full w-full rounded-[14px] border-2 border-white bg-slate-200 flex items-center justify-center font-bold text-indigo-600 text-xs uppercase">
                  {siteConfig.user.initials}
               </div>
            </div>
            <ChevronDown size={16} className={cn("text-gray-400 transition-transform duration-300", isDropdownOpen && "rotate-180")} />
          </button>

          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 mt-4 w-56 bg-white border border-slate-200 rounded-[1.5rem] shadow-2xl p-2 z-50"
              >
                <DropdownItem label="My Profile" />
                <DropdownItem label="Settings" />
                <div className="h-px bg-slate-100 my-1" />
                <DropdownItem onClick={handleSignOut} label="Sign Out" variant="danger" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}

function DropdownItem({ label, onClick, variant = "default" }: { label: string, onClick?: () => void, variant?: "default" | "danger" }) {
  return (
    <button onClick={onClick} className={cn(
      "w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer",
      variant === "danger" ? "text-rose-500 hover:bg-rose-50" : "text-slate-600 hover:bg-slate-50 hover:text-indigo-600"
    )}>
      {label}
    </button>
  );
}
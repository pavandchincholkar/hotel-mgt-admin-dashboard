"use client";

import { useState, useRef, useEffect } from "react";
import { Bell, Search, Command, ChevronDown, User, Settings, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { siteConfig } from "@/config/site";

export function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Logout Logic
  const handleSignOut = () => {
    // Clear the cookie by setting its expiration to the past
    document.cookie = "auth_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    
    // Close dropdown and redirect
    setIsDropdownOpen(false);
    router.push("/login");
  };

  // Close dropdown when clicking outside
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
    <header className="h-20 px-8 flex items-center justify-between bg-white/40 backdrop-blur-md border-b border-slate-200 sticky top-0 z-30">
      
      {/* Search Bar */}
      <div className="flex-1 max-w-md hidden md:block">
        <div className="group flex items-center gap-3 bg-gray-200/50 px-4 py-2.5 rounded-2xl border border-transparent focus-within:border-indigo-300 focus-within:bg-white focus-within:ring-4 focus-within:ring-indigo-500/10 transition-all duration-300">
          <Search size={18} className="text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
          <input
            placeholder="Search everything..."
            className="bg-transparent outline-none text-sm text-gray-800 placeholder:text-gray-400 w-full"
          />
          <div className="flex items-center gap-1 bg-white px-1.5 py-0.5 rounded-md border shadow-sm">
            <Command size={10} className="text-gray-400" />
            <span className="text-[10px] font-bold text-gray-400">K</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-6">
        <button className="relative p-2.5 rounded-xl bg-white border border-slate-200 text-gray-500 hover:text-indigo-600 hover:border-indigo-100 hover:shadow-md transition-all active:scale-95">
          <Bell size={20} />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
        </button>

        <div className="h-10 w-px bg-slate-200 mx-2" />

        {/* --- PROFILE DROPDOWN CONTAINER --- */}
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-3 group transition-all"
          >
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{siteConfig.user.name}</p>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{siteConfig.user.role}</p>
            </div>
            
            <div className="relative">
              <div className="h-11 w-11 rounded-2xl bg-linear-to-tr from-indigo-500 to-purple-500 p-0.5 shadow-lg shadow-indigo-100 group-hover:scale-105 transition-transform">
                 <div className="h-full w-full rounded-[14px] border-2 border-white bg-slate-200 overflow-hidden flex items-center justify-center font-bold text-indigo-600 text-xs">
                    {siteConfig.user.initials}
                 </div>
              </div>
              <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 border-2 border-white rounded-full" />
            </div>
            
            <motion.div
              animate={{ rotate: isDropdownOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown size={16} className="text-gray-400 group-hover:text-indigo-600" />
            </motion.div>
          </button>

          {/* --- THE ACTUAL MENU --- */}
          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute right-0 mt-4 w-56 bg-white border border-slate-200 rounded-[1.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden p-2 z-50"
              >
                <div className="px-4 py-3 border-b border-slate-50 mb-1 sm:hidden">
                    <p className="text-sm font-bold text-gray-900">{siteConfig.user.name}</p>
                    <p className="text-[10px] text-gray-400 uppercase">{siteConfig.user.role}</p>
                </div>

                <DropdownItem icon={<User size={16}/>} label="My Profile" />
                <DropdownItem icon={<Settings size={16}/>} label="Account Settings" />
                <div className="h-px bg-slate-100 my-1" />
                
                {/* Sign Out handler */}
                <DropdownItem 
                    onClick={handleSignOut} 
                    icon={<LogOut size={16}/>} 
                    label="Sign Out" 
                    variant="danger" 
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}

// Sub-component for individual menu items
function DropdownItem({ 
  icon, 
  label, 
  onClick, 
  variant = "default" 
}: { 
  icon: React.ReactNode, 
  label: string, 
  onClick?: () => void,
  variant?: "default" | "danger" 
}) {
  return (
    <button 
      onClick={onClick}
      className={`
      w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all
      ${variant === "danger" 
        ? "text-rose-500 hover:bg-rose-50" 
        : "text-slate-600 hover:bg-slate-50 hover:text-indigo-600"}
    `}>
      <span className="opacity-70">{icon}</span>
      {label}
    </button>
  );
}
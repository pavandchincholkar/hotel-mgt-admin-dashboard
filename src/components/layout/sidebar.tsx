"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Calendar,
  BedDouble,
  Users,
  BarChart3,
  Settings,
  ChevronRight,
  X,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";

const menu = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/" },
  { name: "Reservation", icon: Calendar, href: "/reservation" },
  { name: "Rooms", icon: BedDouble, href: "/rooms" },
  { name: "Customers", icon: Users, href: "/customers" },
  { name: "Analytics", icon: BarChart3, href: "/analytics" },
  { name: "Settings", icon: Settings, href: "/settings" },
];

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className={cn(
      "fixed inset-y-0 left-0 w-72 bg-white border-r border-slate-200 flex flex-col h-full transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:bg-white/10 lg:backdrop-blur-xl",
      // Mobile: z-50 to stay above content. Desktop: z-30
      "z-100 lg:z-30", 
      isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
    )}>
      
      {/* Brand Identity */}
      <div className="p-8 mb-2 shrink-0 flex items-center justify-between"> 
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="relative">
            <div className="h-11 w-11 rounded-2xl bg-indigo-600 rotate-3 group-hover:rotate-6 transition-transform duration-300" />
            <div className="absolute inset-0 h-11 w-11 rounded-2xl bg-linear-to-tr from-indigo-600 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-200">
              <Sparkles className="text-white w-6 h-6" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tight text-slate-900">{siteConfig.name}</span>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-500">{siteConfig.company}</span>
          </div>
        </div>

        {/* Mobile Close Button */}
        <button 
          onClick={() => setIsOpen(false)}
          className="lg:hidden p-2 rounded-xl hover:bg-slate-100 text-slate-400 active:scale-90 transition-transform"
        >
          <X size={20} />
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto no-scrollbar relative z-10">
        {menu.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "group relative flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm transition-all duration-200",
                active
                  ? "text-indigo-700 font-bold"
                  : "text-slate-500 hover:text-slate-900 hover:bg-slate-200/50"
              )}
            >
              {active && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-0 bg-indigo-100/80 rounded-2xl border border-indigo-200"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <item.icon 
                size={20} 
                className={cn("relative z-10 transition-colors", active ? "text-indigo-600" : "group-hover:text-indigo-500")} 
                strokeWidth={active ? 2.5 : 2} 
              />
              <span className="relative z-10 flex-1">{item.name}</span>
              {active && <ChevronRight size={14} className="relative z-10 opacity-70 text-indigo-600" />}
            </Link>
          );
        })}
      </nav>

      {/* Support Card */}
      <div className="p-6 mt-auto shrink-0 bg-white/50 border-t border-slate-100 hidden sm:block">
        <div className="bg-slate-900 rounded-4xl p-6 relative overflow-hidden group shadow-xl">
          <div className="absolute -top-12 -right-12 w-24 h-24 bg-indigo-500/30 rounded-full blur-2xl group-hover:bg-indigo-500/50 transition-colors" />
          <div className="relative z-10">
            <p className="text-white text-[10px] font-black opacity-50 uppercase tracking-[0.2em]">Support</p>
            <p className="text-white text-sm font-bold mt-1 leading-snug">Need help?</p>
            <button className="mt-4 w-full py-3 bg-white text-slate-900 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-50 transition-all active:scale-95 shadow-lg">
              Open Tickets
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
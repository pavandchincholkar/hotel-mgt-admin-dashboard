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
  ChevronRight
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

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-72 bg-white/80 backdrop-blur-xl border-r border-slate-200 flex flex-col h-full relative z-20">
      
      {/* Brand Identity - FIXED TOP */}
      <div className="p-8 mb-2 shrink-0"> 
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="relative">
            <div className="h-11 w-11 rounded-2xl bg-indigo-600 rotate-3 group-hover:rotate-6 transition-transform duration-300" />
            <div className="absolute inset-0 h-11 w-11 rounded-2xl bg-linear-to-tr from-indigo-600 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-200">
              <SparklesIcon className="text-white w-6 h-6" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tight text-slate-900">{siteConfig.name}</span>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-500">{siteConfig.company}</span>
          </div>
        </div>
      </div>

      {/* Navigation Menu - MIDDLE AREA */}
      <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto no-scrollbar">
        {menu.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              scroll={false} 
              className={cn(
                "group relative flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm transition-all duration-200",
                active
                  ? "text-indigo-700 font-bold"
                  : "text-slate-500 hover:text-slate-900 hover:bg-slate-200/50 hover:shadow-sm"
              )}
            >
              {active && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-0 bg-indigo-100/80 rounded-2xl border border-indigo-200 shadow-sm shadow-indigo-100/50"
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

      {/* Support Card - FIXED AT VERY END */}
      <div className="p-6 mt-auto shrink-0 bg-white/50 border-t border-slate-100">
        <div className="bg-slate-900 rounded-4xl p-6 relative overflow-hidden group shadow-xl">
          <div className="absolute -top-12 -right-12 w-24 h-24 bg-indigo-500/30 rounded-full blur-2xl group-hover:bg-indigo-500/50 transition-colors" />
          
          <div className="relative z-10">
            <p className="text-white text-[10px] font-black opacity-50 uppercase tracking-[0.2em]">Support</p>
            <p className="text-white text-sm font-bold mt-1 leading-snug">Need help with your suite?</p>
            
            <button className="mt-4 w-full py-3 bg-white text-slate-900 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-50 transition-all active:scale-95 shadow-lg">
              Open Tickets
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}

function SparklesIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg 
      {...props} 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={2} 
        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" 
      />
    </svg>
  );
}
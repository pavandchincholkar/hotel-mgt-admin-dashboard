"use client";

import { Plus, LayoutGrid, List, Sparkles, Coffee, Wifi, Tv } from "lucide-react";
import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";

const rooms = [
  { number: "101", type: "Deluxe King", status: "Available", price: 120, floor: "1st Floor" },
  { number: "102", type: "Executive Suite", status: "Occupied", price: 220, floor: "1st Floor" },
  { number: "203", type: "Deluxe King", status: "Cleaning", price: 140, floor: "2nd Floor" },
  { number: "305", type: "Presidential", status: "Available", price: 450, floor: "3rd Floor" },
];

const statusConfig = {
  Available: "bg-emerald-500 shadow-emerald-200/50",
  Occupied: "bg-rose-500 shadow-rose-200/50",
  Cleaning: "bg-amber-500 shadow-amber-200/50",
};

export default function RoomsPage() {
  return (
    <div className="space-y-6 md:space-y-8 antialiased pb-10">
      {/* --- RESPONSIVE HEADER --- */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-6">
        <div className="w-full xl:w-auto">
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight text-center sm:text-left">
            Room Inventory
          </h1>
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-4 mt-3">
            <span className="flex items-center gap-1.5 text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500" /> 24 Free
            </span>
            <span className="flex items-center gap-1.5 text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-400">
              <span className="w-2 h-2 rounded-full bg-rose-500" /> 12 Busy
            </span>
            <span className="hidden sm:inline-block text-[9px] font-bold text-indigo-500/40 uppercase tracking-widest ml-1">
              {siteConfig.name} {siteConfig.company}
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full xl:w-auto">
          {/* Layout Toggle - Hidden on tiny mobile screens to save space */}
          <div className="hidden xs:flex bg-slate-100 p-1 rounded-2xl border border-slate-200 items-center justify-center">
            <button className="flex-1 sm:flex-none p-2.5 bg-white rounded-xl shadow-sm text-indigo-600">
              <LayoutGrid size={18} />
            </button>
            <button className="flex-1 sm:flex-none p-2.5 text-slate-400 hover:text-slate-600 transition-colors">
              <List size={18} />
            </button>
          </div>
          
          <button className="w-full sm:w-auto px-6 py-3.5 bg-slate-900 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-xl shadow-slate-200 hover:bg-indigo-600 transition-all flex items-center justify-center gap-2 active:scale-95">
            <Plus size={18} /> Add Unit
          </button>
        </div>
      </div>

      {/* --- RESPONSIVE GRID --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {rooms.map((room, i) => (
          <motion.div
            key={room.number}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="group relative bg-white border border-slate-100 rounded-4xl p-6 sm:p-8 shadow-sm hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 transform-gpu"
          >
            {/* Status Indicator */}
            <div className={`absolute top-6 right-6 sm:top-8 sm:right-8 px-3 py-1 rounded-full text-[8px] sm:text-[9px] font-black uppercase tracking-widest text-white shadow-lg ${statusConfig[room.status as keyof typeof statusConfig]}`}>
              {room.status}
            </div>

            <div className="mt-4">
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">
                {room.floor}
              </p>
              {/* Fluid Typography for Room Number */}
              <h2 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tighter group-hover:text-indigo-600 transition-colors">
                {room.number}
              </h2>
              <p className="text-xs sm:text-sm font-bold text-slate-500 mt-2">
                {room.type}
              </p>
            </div>

            {/* Amenities */}
            <div className="flex gap-3 sm:gap-4 mt-8">
              {[Wifi, Coffee, Tv].map((Icon, idx) => (
                <div key={idx} className="p-2 rounded-xl bg-slate-50 text-slate-300 group-hover:text-indigo-400 transition-colors">
                  <Icon size={16} />
                </div>
              ))}
            </div>

            <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-slate-50 flex items-center justify-between">
              <div>
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Nightly</p>
                <p className="text-xl sm:text-2xl font-black text-slate-900">${room.price}</p>
              </div>
              
              <motion.button 
                whileTap={{ scale: 0.9 }}
                className="h-11 w-11 sm:h-12 sm:w-12 rounded-xl sm:rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-lg hover:bg-indigo-600 transition-colors"
              >
                <Plus size={20} />
              </motion.button>
            </div>

            {/* Sparkle Decoration - Optimized for Performance */}
            <Sparkles className="absolute -bottom-4 -right-4 w-24 h-24 text-slate-100/40 opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none group-hover:rotate-12 hidden lg:block" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
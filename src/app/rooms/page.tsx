"use client";

import { Plus, LayoutGrid, List, Sparkles, Coffee, Wifi, Tv } from "lucide-react";
import { motion } from "framer-motion";
import { siteConfig } from "@/config/site"; // 🔥 Connected to siteConfig

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
    <div className="space-y-8 antialiased pb-10">
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Room Inventory
          </h1>
          <div className="flex items-center gap-4 mt-2">
            <span className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500" /> 24 Available
            </span>
            <span className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400">
              <span className="w-2 h-2 rounded-full bg-rose-500" /> 12 Occupied
            </span>
            <span className="text-[10px] font-bold text-indigo-500/60 uppercase tracking-widest ml-2">
              {siteConfig.name} {siteConfig.company}
            </span>
          </div>
        </div>

        <div className="flex gap-3 w-full md:w-auto">
          <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200">
            <button className="p-2.5 bg-white rounded-xl shadow-sm text-indigo-600">
              <LayoutGrid size={18} />
            </button>
            <button className="p-2.5 text-slate-400 hover:text-slate-600 transition-colors">
              <List size={18} />
            </button>
          </div>
          <button className="flex-1 md:flex-none px-6 py-3 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-slate-200 hover:bg-indigo-600 transition-all flex items-center justify-center gap-2 active:scale-95">
            <Plus size={18} /> Add Unit
          </button>
        </div>
      </div>

      {/* --- ROOM GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {rooms.map((room, i) => (
          <motion.div
            key={room.number}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ y: -10 }}
            className="group relative bg-white border border-slate-100 rounded-3xl p-8 shadow-sm hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 transform-gpu"
          >
            {/* Status Indicator Badge */}
            <div className={`absolute top-8 right-8 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.15em] text-white shadow-lg ${statusConfig[room.status as keyof typeof statusConfig]}`}>
              {room.status}
            </div>

            <div className="mt-4">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] mb-1">
                {room.floor}
              </p>
              <h2 className="text-5xl font-black text-slate-900 tracking-tighter group-hover:text-indigo-600 transition-colors">
                {room.number}
              </h2>
              <p className="text-sm font-bold text-slate-500 mt-2">
                {room.type}
              </p>
            </div>

            {/* Amenities Section */}
            <div className="flex gap-4 mt-8">
              <div className="p-2 rounded-xl bg-slate-50 text-slate-300 group-hover:text-indigo-400 transition-colors">
                <Wifi size={16} />
              </div>
              <div className="p-2 rounded-xl bg-slate-50 text-slate-300 group-hover:text-indigo-400 transition-colors">
                <Coffee size={16} />
              </div>
              <div className="p-2 rounded-xl bg-slate-50 text-slate-300 group-hover:text-indigo-400 transition-colors">
                <Tv size={16} />
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-slate-50 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Per Night
                </p>
                <p className="text-2xl font-black text-slate-900">
                  ${room.price}
                </p>
              </div>
              
              <motion.button 
                whileHover={{ rotate: 90, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="h-12 w-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-xl shadow-slate-200 group-hover:bg-indigo-600 transition-colors"
              >
                <Plus size={24} />
              </motion.button>
            </div>

            {/* Decorative Sparkle Background Icon */}
            <Sparkles className="absolute -bottom-6 -right-6 w-32 h-32 text-slate-100/50 opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none group-hover:rotate-12" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
"use client";

import { Plus, Search, Filter, MoreHorizontal, Calendar, ChevronRight, DoorOpen } from "lucide-react";
import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";

interface Reservation {
  id: string;
  name: string;
  room: string;
  status: 'Confirmed' | 'Pending' | 'Cancelled';
  date: string;
  type: string;
  amount: string;
}

const reservations: Reservation[] = [
  { id: "RES-9921", name: "John Doe", room: "101", status: "Confirmed", date: "12 Apr - 15 Apr", type: "Deluxe", amount: "$450" },
  { id: "RES-9922", name: "Alice Smith", room: "204", status: "Pending", date: "14 Apr - 18 Apr", type: "Suite", amount: "$880" },
  { id: "RES-9923", name: "Robert Brown", room: "305", status: "Cancelled", date: "10 Apr - 12 Apr", type: "Deluxe", amount: "$320" },
];

const statusStyles: Record<Reservation['status'], string> = {
  Confirmed: "bg-emerald-50 text-emerald-600 border-emerald-100",
  Pending: "bg-amber-50 text-amber-600 border-amber-100",
  Cancelled: "bg-rose-50 text-rose-600 border-rose-100",
};

export default function ReservationPage() {
  return (
    <div className="space-y-6 md:space-y-8 pb-10 antialiased">
      {/* --- HEADER --- */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Reservations</h1>
          <p className="text-xs md:text-sm text-slate-500 font-medium">
            Managing bookings for {siteConfig.name} {siteConfig.company}.
          </p>
        </div>

        <motion.button 
          whileTap={{ scale: 0.98 }}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all text-sm"
        >
          <Plus size={18} />
          <span>New Reservation</span>
        </motion.button>
      </div>

      {/* --- FILTER BAR --- */}
      <div className="flex flex-col lg:flex-row gap-3 md:gap-4">
        <div className="flex-1 relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
          <input
            placeholder="Search bookings..."
            className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-100 rounded-2xl text-sm focus:ring-4 focus:ring-indigo-500/5 outline-none transition-all shadow-sm"
          />
        </div>

        <div className="flex gap-2">
          <select className="flex-1 lg:flex-none px-4 py-3.5 bg-white border border-slate-100 rounded-2xl text-xs font-bold text-slate-600 outline-none cursor-pointer">
            <option>All Status</option>
            <option>Confirmed</option>
            <option>Pending</option>
          </select>
          <button className="p-3.5 bg-white border border-slate-100 rounded-2xl text-slate-500 hover:text-indigo-600 transition-colors shadow-sm">
            <Filter size={18} />
          </button>
        </div>
      </div>

      {/* --- BOOKING LIST --- */}
      <div className="space-y-4">
        {reservations.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="group flex flex-col md:flex-row md:items-center justify-between bg-white border border-slate-100 rounded-4xl p-5 md:p-6 shadow-sm hover:shadow-xl hover:border-indigo-100 transition-all duration-300 cursor-pointer transform-gpu"
          >
            {/* Guest Info Section */}
            <div className="flex items-center gap-4 md:gap-5 flex-1">
              <div className="relative shrink-0">
                <div className="h-12 w-12 md:h-14 md:w-14 rounded-2xl bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-lg font-black shadow-lg">
                  {item.name[0]}
                </div>
                <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                </div>
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-x-2">
                  <h3 className="text-base md:text-lg font-black text-slate-900 group-hover:text-indigo-600 transition-colors truncate">
                    {item.name}
                  </h3>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.id}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mt-1">
                  <span className="flex items-center gap-1 text-[11px] font-bold text-slate-500">
                    <DoorOpen size={14} className="text-indigo-500 shrink-0" /> {item.type} • Rm {item.room}
                  </span>
                  <span className="hidden sm:block w-1 h-1 rounded-full bg-slate-300" />
                  <span className="flex items-center gap-1 text-[11px] font-bold text-slate-500">
                    <Calendar size={14} className="text-indigo-500 shrink-0" /> {item.date}
                  </span>
                </div>
              </div>
            </div>

            {/* Price & Status Section */}
            <div className="flex items-center justify-between md:justify-end gap-4 md:gap-8 mt-5 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 border-slate-50">
              <div className="md:text-right">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Total Amount</p>
                <p className="text-base md:text-lg font-black text-slate-900">{item.amount}</p>
              </div>

              <div className="flex items-center gap-2 sm:gap-4">
                <span className={`px-3 md:px-4 py-1.5 rounded-xl text-[9px] md:text-[10px] font-black uppercase tracking-widest border ${statusStyles[item.status]}`}>
                  {item.status}
                </span>
                
                <div className="flex gap-1.5">
                   <button className="hidden sm:flex p-2.5 rounded-xl bg-slate-50 text-slate-400 hover:bg-indigo-50 transition-colors">
                    <MoreHorizontal size={18} />
                   </button>
                   <button className="p-2.5 rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all">
                    <ChevronRight size={18} />
                   </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
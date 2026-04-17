"use client";

import { Plus, Search, Filter, MoreHorizontal, Calendar, ChevronRight, LucideProps } from "lucide-react";
import { motion } from "framer-motion";
import { siteConfig } from "@/config/site"; // 🔥 Connected to siteConfig

// Define a proper interface for your reservation data
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
    <div className="space-y-8 max-w-300 antialiased">
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Reservations</h1>
          <p className="text-sm text-slate-500 font-medium mt-1">
            Managing bookings for {siteConfig.name} {siteConfig.company}.
          </p>
        </div>

        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all"
        >
          <Plus size={18} />
          <span>New Reservation</span>
        </motion.button>
      </div>

      {/* --- FILTER BAR --- */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
          <input
            placeholder="Search by guest name, ID, or room..."
            className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-100 rounded-[1.25rem] text-sm focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-300 outline-none transition-all shadow-sm"
          />
        </div>

        <div className="flex gap-2">
          <select className="px-4 py-3.5 bg-white border border-slate-100 rounded-2xl text-sm font-bold text-slate-600 outline-none cursor-pointer hover:border-indigo-200 transition-colors">
            <option>All Status</option>
            <option>Confirmed</option>
            <option>Pending</option>
          </select>
          <button className="p-3.5 bg-white border border-slate-100 rounded-2xl text-slate-500 hover:text-indigo-600 transition-colors">
            <Filter size={18} />
          </button>
        </div>
      </div>

      {/* --- BOOKING LIST --- */}
      <div className="space-y-4">
        {reservations.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group flex flex-col md:flex-row items-center justify-between bg-white border border-slate-100 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:border-indigo-100 transition-all duration-300 cursor-pointer transform-gpu"
          >
            {/* Guest Info */}
            <div className="flex items-center gap-5 flex-1">
              <div className="relative">
                <div className="h-14 w-14 rounded-2xl bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xl font-black shadow-lg shadow-indigo-100 transition-transform group-hover:rotate-3">
                  {item.name[0]}
                </div>
                <div className="absolute -bottom-1 -right-1 h-5 w-5 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <div className="h-3 w-3 rounded-full bg-emerald-500" />
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-black text-slate-900 group-hover:text-indigo-600 transition-colors">{item.name}</h3>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.id}</span>
                </div>
                <div className="flex items-center gap-3 mt-1">
                  <span className="flex items-center gap-1 text-xs font-bold text-slate-500">
                    <DoorOpen size={14} className="text-indigo-500" /> Room {item.room}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-slate-300" />
                  <span className="flex items-center gap-1 text-xs font-bold text-slate-500">
                    <Calendar size={14} className="text-indigo-500" /> {item.date}
                  </span>
                </div>
              </div>
            </div>

            {/* Price & Status */}
            <div className="flex items-center gap-8 mt-4 md:mt-0 w-full md:w-auto border-t md:border-t-0 pt-4 md:pt-0">
              <div className="text-right">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Amount</p>
                <p className="text-lg font-black text-slate-900">{item.amount}</p>
              </div>

              <div className="flex items-center gap-4">
                <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border ${statusStyles[item.status]}`}>
                  {item.status}
                </span>
                
                <div className="flex gap-2">
                   <button className="p-2.5 rounded-xl bg-slate-50 text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
                    <MoreHorizontal size={18} />
                   </button>
                   <button className="p-2.5 rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-100 hover:bg-indigo-700 transition-colors">
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

function DoorOpen(props: LucideProps) {
  return (
    <svg 
      {...props} 
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || 24} 
      height={props.size || 24} 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  );
}
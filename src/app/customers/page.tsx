"use client";

import { Plus, Search, Mail, Star, MoreVertical } from "lucide-react";
import { motion } from "framer-motion";
import { siteConfig } from "@/config/site"; // 🔥 Connected to siteConfig

const customers = [
  { name: "John Doe", email: "john@email.com", bookings: 12, spent: "$4,250", rating: 4.8, status: "V.I.P" },
  { name: "Alice Smith", email: "alice@email.com", bookings: 3, spent: "$1,120", rating: 4.2, status: "Regular" },
  { name: "Robert Brown", email: "robert@email.com", bookings: 8, spent: "$2,890", rating: 4.5, status: "V.I.P" },
  { name: "Emma Watson", email: "emma@email.com", bookings: 2, spent: "$540", rating: 3.9, status: "New" },
];

export default function CustomersPage() {
  return (
    <div className="space-y-8 antialiased">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Guest Directory</h1>
          <p className="text-sm text-slate-500 font-medium mt-1">
            Managing loyalty for {siteConfig.name} {siteConfig.company}.
          </p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95">
          <Plus size={18} /> Add Customer
        </button>
      </div>

      <div className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={20} />
        <input
          placeholder="Search by name, email or phone..."
          className="w-full pl-12 pr-4 py-4 bg-white border border-slate-100 rounded-2xl text-sm focus:ring-4 focus:ring-indigo-500/5 outline-none shadow-sm transition-all"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {customers.map((guest, i) => (
          <motion.div
            key={guest.email}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className="group bg-white border border-slate-100 rounded-3xl p-8 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 transform-gpu"
          >
            <div className="flex justify-between items-start">
              <div className="h-16 w-16 rounded-2xl bg-linear-to-tr from-indigo-500 to-purple-500 p-0.5 shadow-lg shadow-indigo-100">
                <div className="h-full w-full rounded-[14px] border-4 border-white bg-slate-100 flex items-center justify-center text-xl font-black text-indigo-600">
                  {guest.name[0]}
                </div>
              </div>
              <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                guest.status === "V.I.P" ? "bg-amber-100 text-amber-600" : "bg-slate-100 text-slate-500"
              }`}>
                {guest.status}
              </span>
            </div>

            <div className="mt-6">
              <h3 className="text-xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors">{guest.name}</h3>
              <div className="flex flex-col gap-1 mt-2">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                  <Mail size={14} /> {guest.email}
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                  <Star size={14} className="text-amber-400 fill-amber-400" /> {guest.rating} Rating
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-slate-50">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Stays</p>
                <p className="text-lg font-black text-slate-900">{guest.bookings}</p>
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Spent</p>
                <p className="text-lg font-black text-emerald-600">{guest.spent}</p>
              </div>
            </div>

            <div className="mt-6 flex gap-2">
              <button className="flex-1 py-3 bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-indigo-600 transition-colors">
                View Profile
              </button>
              <button className="px-3 py-3 bg-slate-100 text-slate-600 rounded-xl hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
                <MoreVertical size={16} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
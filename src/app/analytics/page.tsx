"use client";

import { useState, useLayoutEffect, useRef } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { 
  Download, 
  Calendar, 
  TrendingUp, 
  Activity, 
  PieChart 
} from "lucide-react";
import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

const revenueData = [
  { name: "Mon", value: 400, prev: 300 },
  { name: "Tue", value: 800, prev: 600 },
  { name: "Wed", value: 650, prev: 700 },
  { name: "Thu", value: 1200, prev: 900 },
  { name: "Fri", value: 900, prev: 850 },
  { name: "Sat", value: 1400, prev: 1100 },
  { name: "Sun", value: 1100, prev: 950 },
];

export default function AnalyticsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState<{ width: number; height: number } | null>(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return;
    const node = containerRef.current;
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry.contentRect.width > 0 && entry.contentRect.height > 0) {
        setDims({
          width: Math.floor(entry.contentRect.width),
          height: Math.floor(entry.contentRect.height),
        });
      }
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="space-y-6 md:space-y-10 pb-10 antialiased">
      {/* --- RESPONSIVE HEADER --- */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 w-fit">
            <Activity size={12} className="text-indigo-600" />
            <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600">
              {siteConfig.name} Intelligence
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter leading-none">
            Analytics <span className="text-slate-400 font-light">Overview</span>
          </h1>
        </div>
        
        <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto">
          <button className="flex-1 xl:flex-none flex items-center justify-center gap-2 px-5 py-3 bg-white border border-slate-300 rounded-2xl text-[11px] font-black text-slate-600 hover:bg-slate-50 transition-all shadow-sm active:scale-95">
            <Calendar size={14} /> 14 Apr - 21 Apr
          </button>
          <button className="flex-1 xl:flex-none flex items-center justify-center gap-2 px-5 py-3 bg-slate-900 text-white rounded-2xl text-[11px] font-black hover:bg-indigo-600 transition-all shadow-2xl shadow-indigo-100 active:scale-95">
            <Download size={14} /> Export
          </button>
        </div>
      </div>

      {/* --- ADAPTIVE STATS GRID --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {[
          { label: "Gross Revenue", value: "$12,480", growth: "+18.2%", trend: "up" },
          { label: "Occupancy", value: "82.4%", growth: "+4.1%", trend: "up" },
          { label: "RevPAR", value: "$172.50", growth: "-2.4%", trend: "down" },
          { label: "Loyalty", value: "94/100", growth: "+12.0%", trend: "up" },
        ].map((stat, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -5 }}
            className="bg-white border border-slate-100 rounded-4xl p-6 md:p-8 shadow-sm group hover:shadow-xl transition-all duration-300"
          >
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">{stat.label}</p>
            <div className="flex items-end justify-between">
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tighter group-hover:text-indigo-600 transition-colors leading-none">{stat.value}</h2>
              <div className={`flex items-center gap-1 text-[11px] font-black ${stat.trend === 'up' ? 'text-emerald-600' : 'text-rose-600'}`}>
                {stat.trend === 'up' ? <TrendingUp size={12} /> : <TrendingUp size={12} className="rotate-180" />}
                {stat.growth}
              </div>
            </div>
            {/* Minimal Sparkline Viz */}
            <div className="mt-6 flex items-end gap-1.5 h-8">
              {[40, 70, 45, 90, 65, 80, 50].map((h, j) => (
                <div key={j} className="flex-1 bg-slate-100 rounded-full group-hover:bg-indigo-500 transition-all duration-500" style={{ height: `${h}%` }} />
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* --- MAIN INTERACTIVE SECTION --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Chart Card */}
        <div className="lg:col-span-2 relative bg-white border border-slate-200 rounded-4xl sm:rounded-[3rem] p-6 sm:p-10 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden">
          <div className="absolute -top-24 -left-24 w-64 h-64 sm:w-96 sm:h-96 bg-indigo-500/5 rounded-full blur-[80px] sm:blur-[100px] pointer-events-none" />
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10 relative z-10">
            <div>
              <h3 className="text-xl font-black text-slate-900 tracking-tight">Financial Velocity</h3>
              <p className="text-xs text-slate-500 font-medium">Performance tracking for {siteConfig.company}.</p>
            </div>
            <div className="bg-slate-50 p-1.5 rounded-2xl flex gap-1 w-full sm:w-auto">
              <button className="flex-1 sm:flex-none px-4 py-2 bg-white rounded-xl shadow-sm text-[10px] font-black text-indigo-600">Linear</button>
              <button className="flex-1 sm:flex-none px-4 py-2 text-[10px] font-black text-slate-400 hover:text-slate-900 transition-colors">Logarithmic</button>
            </div>
          </div>

          <div ref={containerRef} className="h-72 sm:h-100 w-full relative z-10">
            {dims ? (
              <AreaChart width={dims.width} height={dims.height} data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                <defs>
                  <linearGradient id="mainGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke="#f1f5f9" strokeWidth={2} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 10, fontWeight: 800 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 10, fontWeight: 800 }} />
                <Tooltip cursor={{ stroke: '#6366f1', strokeWidth: 2 }} content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-slate-900 text-white p-4 rounded-2xl shadow-2xl border border-white/10">
                          <p className="text-[9px] font-black text-indigo-400 uppercase tracking-widest mb-2">Revenue</p>
                          <p className="text-xl font-black">${payload[0].value}</p>
                        </div>
                      );
                    }
                    return null;
                  }} 
                />
                <Area type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={5} fill="url(#mainGradient)" animationDuration={1500} />
                <Area type="monotone" dataKey="prev" stroke="#cbd5e1" strokeWidth={2} strokeDasharray="8 8" fill="transparent" isAnimationActive={false} />
              </AreaChart>
            ) : (
              <div className="w-full h-full bg-slate-50 animate-pulse rounded-4xl" />
            )}
          </div>
        </div>

        {/* Channel Split Side Panel */}
        <div className="bg-slate-900 rounded-3xl p-8 sm:p-10 text-white flex flex-col justify-between shadow-2xl relative overflow-hidden">
          <div className="absolute bottom-[-10%] right-[-10%] w-64 h-64 bg-indigo-500/20 rounded-full blur-[80px] pointer-events-none" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
                <PieChart size={18} className="text-indigo-400" />
              </div>
              <h3 className="text-lg font-black tracking-tight">Channel Split</h3>
            </div>

            <div className="space-y-8">
              {[
                { label: "Direct", val: "64%", color: "bg-indigo-500" },
                { label: "OTA", val: "22%", color: "bg-indigo-400" },
                { label: "Corporate", val: "14%", color: "bg-indigo-300" },
              ].map((item, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                    <span>{item.label}</span>
                    <span className="text-white">{item.val}</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: item.val }} transition={{ duration: 1, delay: index * 0.1 }} className={cn("h-full rounded-full", item.color)} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button className="relative z-10 mt-10 w-full py-4 bg-white text-slate-900 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-indigo-50 transition-all active:scale-95 shadow-xl">
            Detailed Reports
          </button>
        </div>

      </div>
    </div>
  );
}
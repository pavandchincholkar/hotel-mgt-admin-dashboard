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
  ArrowUpRight, 
  TrendingUp, 
  Activity, 
  PieChart 
} from "lucide-react";
import { motion } from "framer-motion";
import { siteConfig } from "@/config/site"; // 🔥 Connected to siteConfig

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

  // Measure the parent div BEFORE Recharts is initialized to avoid ResponsiveContainer issues
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
    <div className="space-y-8 pb-10 antialiased">
      {/* --- ELITE HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 w-fit">
            <Activity size={12} className="text-indigo-600" />
            <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600">
              {siteConfig.name} Intelligence
            </span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter">
            Analytics <span className="text-slate-400 font-light">Overview</span>
          </h1>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-300 rounded-2xl text-xs font-black text-slate-600 hover:bg-slate-50 transition-all shadow-sm active:scale-95">
            <Calendar size={14} /> 14 Apr - 21 Apr
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl text-xs font-black hover:bg-indigo-600 transition-all shadow-2xl shadow-indigo-200 active:scale-95">
            <Download size={14} /> Export Dataset
          </button>
        </div>
      </div>

      {/* --- DYNAMIC STATS --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Gross Revenue", value: "$12,480", growth: "+18.2%", trend: "up" },
          { label: "Active Occupancy", value: "82.4%", growth: "+4.1%", trend: "up" },
          { label: "RevPAR Index", value: "$172.50", growth: "-2.4%", trend: "down" },
          { label: "Guest Loyalty", value: "94/100", growth: "+12.0%", trend: "up" },
        ].map((stat, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -8, scale: 1.02 }}
            className="relative p-px rounded-3xl bg-slate-200 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.08)] group cursor-default transform-gpu"
          >
            <div className="bg-white rounded-[2.45rem] p-8 h-full transition-colors group-hover:bg-slate-50">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">{stat.label}</p>
              <div className="flex items-end justify-between">
                <h2 className="text-3xl font-black text-slate-900 tracking-tighter group-hover:text-indigo-600 transition-colors">{stat.value}</h2>
                <div className={`flex items-center gap-1 text-[11px] font-black ${stat.trend === 'up' ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {stat.trend === 'up' ? <TrendingUp size={12} /> : <TrendingUp size={12} className="rotate-180" />}
                  {stat.growth}
                </div>
              </div>
              <div className="mt-6 flex items-end gap-1.5 h-10">
                {[40, 70, 45, 90, 65, 80, 50].map((h, j) => (
                  <div key={j} className="flex-1 bg-slate-100 rounded-full group-hover:bg-indigo-500 transition-all duration-500" style={{ height: `${h}%` }} />
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* --- INTERACTIVE GRID --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* --- MAIN CHART CARD --- */}
        <motion.div 
          whileHover={{ y: -5, scale: 1.005 }}
          className="lg:col-span-2 relative bg-white border border-slate-200 rounded-[3rem] p-10 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_80px_-30px_rgba(0,0,0,0.1)] transition-all duration-500 overflow-hidden transform-gpu"
        >
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="flex justify-between items-start mb-12 relative z-10">
            <div>
              <h3 className="text-xl font-black text-slate-900 tracking-tight">Financial Velocity</h3>
              <p className="text-sm text-slate-500 font-medium">Performance tracking for {siteConfig.company}.</p>
            </div>
            <div className="bg-slate-100 p-1.5 rounded-2xl flex gap-1 border border-slate-200">
              <button className="px-5 py-2 bg-white rounded-xl shadow-sm text-xs font-black text-indigo-600">Linear</button>
              <button className="px-5 py-2 text-xs font-black text-slate-500 hover:text-slate-900 transition-colors">Logarithmic</button>
            </div>
          </div>

          <div ref={containerRef} className="h-100 w-full relative z-10">
            {dims ? (
              <AreaChart width={dims.width} height={dims.height} data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 40 }}>
                <defs>
                  <linearGradient id="mainGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke="#f1f5f9" strokeWidth={2} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: "#64748b", fontSize: 12, fontWeight: 800 }} 
                  dy={15} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: "#64748b", fontSize: 12, fontWeight: 800 }} 
                />
                <Tooltip 
                  cursor={{ stroke: '#6366f1', strokeWidth: 2 }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const d = payload[0].payload;
                      return (
                        <div className="bg-slate-900 text-white p-6 rounded-4xl shadow-2xl border border-white/10 backdrop-blur-xl">
                          <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] mb-4">{d.name} Summary</p>
                          <div className="space-y-4">
                            <div>
                              <p className="text-sm font-bold text-slate-400">Current Revenue</p>
                              <p className="text-3xl font-black text-white">${payload[0].value}</p>
                            </div>
                            <div className="flex items-center gap-2 text-[10px] font-black uppercase text-emerald-400 bg-emerald-400/10 px-3 py-2 rounded-xl w-fit">
                              <ArrowUpRight size={12} /> +12.4% Increase
                            </div>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }} 
                />
                <Area type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={6} fill="url(#mainGradient)" animationDuration={2000} />
                <Area type="monotone" dataKey="prev" stroke="#cbd5e1" strokeWidth={3} strokeDasharray="10 10" fill="transparent" isAnimationActive={false} />
              </AreaChart>
            ) : (
              <div className="w-full h-full bg-slate-50 animate-pulse rounded-[3rem]" />
            )}
          </div>
        </motion.div>

        {/* --- SIDE PANEL --- */}
        <motion.div 
          whileHover={{ y: -5, x: 5 }}
          className="bg-slate-900 rounded-[3rem] p-10 text-white flex flex-col justify-between shadow-[0_20px_50px_-20px_rgba(0,0,0,0.3)] hover:shadow-[0_40px_80px_-20px_rgba(99,102,241,0.2)] transition-all duration-500 relative overflow-hidden border border-slate-800 transform-gpu"
        >
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-indigo-500/30 blur-[80px] pointer-events-none" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-10">
              <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
                <PieChart size={20} className="text-indigo-400" />
              </div>
              <h3 className="text-xl font-black tracking-tight">Channel Split</h3>
            </div>

            <div className="space-y-10">
              {[
                { label: "Direct Booking", val: "64%", color: "bg-indigo-500" },
                { label: "OTA (External)", val: "22%", color: "bg-indigo-400" },
                { label: "Corporate", val: "14%", color: "bg-indigo-300" },
              ].map((item, index) => (
                <div key={index} className="space-y-4 group/item cursor-default">
                  <div className="flex justify-between text-xs font-black uppercase tracking-[0.15em] text-slate-400 group-hover/item:text-indigo-300 transition-colors">
                    <span>{item.label}</span>
                    <span className="text-white">{item.val}</span>
                  </div>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: item.val }}
                      transition={{ duration: 1.5, delay: index * 0.2 }}
                      className={`h-full ${item.color} rounded-full shadow-[0_0_15px_rgba(99,102,241,0.4)]`} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button className="relative z-10 mt-12 w-full py-5 bg-white text-slate-900 rounded-[1.7rem] font-black text-sm hover:bg-indigo-50 transition-all shadow-2xl active:scale-95">
            View All Reports
          </button>
        </motion.div>

      </div>
    </div>
  );
}
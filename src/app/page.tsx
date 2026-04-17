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
  TrendingUp, 
  Users, 
  DoorOpen, 
  DollarSign, 
  Sparkles, 
} from "lucide-react";
import { siteConfig } from "@/config/site";

const data = [
  { name: "Mon", value: 40 },
  { name: "Tue", value: 65 },
  { name: "Wed", value: 50 },
  { name: "Thu", value: 90 },
  { name: "Fri", value: 70 },
  { name: "Sat", value: 110 },
  { name: "Sun", value: 95 },
];

function ChartComponent() {
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
    <div ref={containerRef} className="h-64 sm:h-80 w-full transform-gpu relative">
      {dims ? (
        <AreaChart 
          width={dims.width} 
          height={dims.height} 
          data={data} 
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: "#94a3b8", fontSize: 10 }} 
            dy={10}
          />
          <YAxis axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 10 }} />
          
          <Tooltip
            isAnimationActive={false}
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-slate-900 text-white shadow-xl rounded-2xl px-3 py-2 border border-slate-800">
                    <p className="text-sm font-black">{payload[0].value} Guests</p>
                  </div>
                );
              }
              return null;
            }}
          />

          <Area
            type="monotone"
            dataKey="value"
            stroke="#6366f1"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorValue)"
            animationDuration={1000}
          />
        </AreaChart>
      ) : (
        <div className="w-full h-full bg-slate-50 animate-pulse rounded-3xl" />
      )}
    </div>
  );
}

export default function Page() {
  return (
    <div className="space-y-6 md:space-y-8 pb-10 antialiased">
      
      {/* --- HERO BENTO GRID --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        
        {/* Welcome Card */}
        <div className="lg:col-span-2 relative overflow-hidden bg-slate-900 rounded-4xl p-6 sm:p-10 text-white shadow-xl group transition-all duration-300">
          <div className="absolute top-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-indigo-500/10 rounded-full blur-[80px] sm:blur-[100px] -mr-20 -mt-20 group-hover:bg-indigo-500/20 transition-colors duration-500" />
          
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 bg-white/10 w-fit px-3 py-1 rounded-full border border-white/10 mb-4 sm:mb-6">
                <Sparkles size={12} className="text-indigo-400" />
                <span className="text-[10px] font-bold uppercase tracking-wider">{siteConfig.name} Overview</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                Welcome back, <br /> 
                <span className="text-indigo-400">{siteConfig.user.name.split(' ')[0]}</span>
              </h2>
              <p className="mt-3 sm:mt-4 text-slate-400 max-w-sm text-sm sm:text-base leading-relaxed">
                Your occupancy is up 14% this week. You have 12 guest check-ins scheduled for today.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 mt-6 sm:mt-8">
              <button className="flex-1 sm:flex-none px-6 py-3 bg-white text-slate-900 rounded-xl font-black text-sm hover:bg-indigo-50 transition-all active:scale-95 shadow-md">
                Reports
              </button>
              <button className="flex-1 sm:flex-none px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-bold text-sm transition-all">
                Staff
              </button>
            </div>
          </div>
        </div>

        {/* Circular Progress */}
        <div className="bg-white border border-slate-100 rounded-4xl p-8 shadow-sm flex flex-col items-center justify-center hover:shadow-lg transition-all">
          <div className="relative flex items-center justify-center">
            <svg className="w-40 h-40 sm:w-48 sm:h-48 transform -rotate-90">
              <circle cx="50%" cy="50%" r="70" stroke="currentColor" strokeWidth="10" fill="transparent" className="text-slate-100" />
              <circle 
                cx="50%" cy="50%" r="70" stroke="currentColor" strokeWidth="10" fill="transparent" 
                strokeDasharray={440}
                strokeDashoffset={440 * (1 - 0.78)}
                strokeLinecap="round"
                className="text-indigo-600 transition-all duration-700 ease-out" 
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-3xl sm:text-4xl font-black text-slate-900">78%</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Occupied</span>
            </div>
          </div>
          <div className="mt-6 flex gap-6 sm:gap-8">
            <div className="text-center">
              <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Available</p>
              <p className="text-lg font-black text-slate-900">12</p>
            </div>
            <div className="w-px h-8 bg-slate-100" />
            <div className="text-center">
              <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Booked</p>
              <p className="text-lg font-black text-slate-900">42</p>
            </div>
          </div>
        </div>
      </div>

      {/* --- QUICK STATS GRID --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {[
          { title: "Total Bookings", value: "254", icon: DoorOpen, trend: "+12%" },
          { title: "Active Guests", value: "64", icon: Users, trend: "+5%" },
          { title: "Net Revenue", value: "$8.2K", icon: DollarSign, trend: "+18%" },
          { title: "Check-ins", value: "120", icon: TrendingUp, trend: "Stable" },
        ].map((stat, i) => (
          <div key={i} className="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm hover:shadow-lg transition-all group flex items-center sm:block gap-4 sm:gap-0">
            <div className="p-3 bg-slate-50 rounded-2xl group-hover:bg-indigo-50 transition-colors w-fit">
              <stat.icon size={20} className="text-slate-400 group-hover:text-indigo-600 transition-colors" />
            </div>
            <div className="sm:mt-4">
              <p className="text-xs font-semibold text-slate-500">{stat.title}</p>
              <div className="flex items-center justify-between mt-1">
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">{stat.value}</h3>
                <span className="text-[10px] font-bold px-1.5 py-0.5 bg-green-50 text-green-600 rounded-md sm:hidden lg:block">{stat.trend}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* --- ANALYTICS & LIVE OPS --- */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-6">
        <div className="lg:col-span-3 bg-white border border-slate-100 rounded-4xl p-6 sm:p-8 shadow-sm hover:shadow-lg transition-all">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h3 className="text-xl font-black text-slate-900 tracking-tight">Booking Analytics</h3>
              <p className="text-xs text-slate-400">Weekly reservation frequency</p>
            </div>
            <select className="w-full sm:w-auto bg-slate-50 border-none rounded-xl px-4 py-2 text-xs font-bold text-slate-600 outline-none">
              <option>This Week</option>
              <option>Last Week</option>
            </select>
          </div>
          <ChartComponent />
        </div>

        <div className="bg-white border border-slate-100 rounded-4xl p-6 sm:p-8 shadow-sm hover:shadow-lg transition-all">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6 flex items-center justify-between">
            Live Ops <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          </h3>

          <div className="space-y-6">
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Rooms</p>
              <div className="flex flex-wrap gap-2">
                {["101", "102", "203", "305"].map((room) => (
                  <div key={room} className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-100 text-[10px] font-bold text-slate-700">
                    {room}
                  </div>
                ))}
              </div>
            </div>

            <div className="h-px bg-slate-100" />

            <div className="space-y-3">
              {[
                { name: "Ravi K.", status: "Cleaning", color: "bg-amber-100 text-amber-700" },
                { name: "Amit S.", status: "Available", color: "bg-emerald-100 text-emerald-700" },
              ].map((staff, i) => (
                <div key={i} className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-800">{staff.name}</span>
                  <span className={`text-[9px] px-2 py-1 rounded-md font-black uppercase ${staff.color}`}>{staff.status}</span>
                </div>
              ))}
            </div>

            <div className="pt-2">
               <div className="p-3 bg-rose-50 border border-rose-100 rounded-2xl flex items-center gap-3 group">
                  <div className="w-8 h-8 rounded-lg bg-rose-500 flex items-center justify-center text-white shrink-0">
                    <Sparkles size={14} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-rose-900">Alerts</p>
                    <p className="text-[9px] text-rose-700 font-bold uppercase">2 Pending</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
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
  ArrowRight 
} from "lucide-react";
import { siteConfig } from "@/config/site"; // 🔥 Connected to siteConfig

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
    <div ref={containerRef} className="h-80 w-full transform-gpu relative">
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
            tick={{ fill: "#94a3b8", fontSize: 12 }} 
            dy={10}
          />
          <YAxis axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 12 }} />
          
          <Tooltip
            isAnimationActive={false}
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-slate-900 text-white shadow-xl rounded-2xl px-4 py-3 border border-slate-800">
                    <p className="text-[10px] uppercase tracking-widest opacity-50 font-bold mb-1">Bookings</p>
                    <p className="text-lg font-black">{payload[0].value} Guests</p>
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
            strokeWidth={4}
            fillOpacity={1}
            fill="url(#colorValue)"
            animationDuration={1000}
            isAnimationActive={true}
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
    <div className="space-y-8 pb-10 antialiased transform-gpu">
      
      {/* --- HERO BENTO GRID --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Welcome Card */}
        <div className="lg:col-span-2 relative overflow-hidden bg-slate-900 rounded-3xl p-10 text-white shadow-xl group transition-transform duration-300 transform-gpu">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] -mr-32 -mt-32 group-hover:bg-indigo-500/20 transition-colors duration-500" />
          
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 bg-white/10 w-fit px-3 py-1 rounded-full border border-white/10 mb-6">
                <Sparkles size={14} className="text-indigo-400" />
                <span className="text-[10px] font-bold uppercase tracking-wider">{siteConfig.name} Overview</span>
              </div>
              <h2 className="text-4xl font-extrabold tracking-tight leading-tight">
                Welcome back, <br /> 
                <span className="text-indigo-400">{siteConfig.user.name.split(' ')[0]}</span>
              </h2>
              <p className="mt-4 text-slate-400 max-w-sm leading-relaxed">
                Your occupancy is up 14% this week. You have 12 guest check-ins scheduled for today.
              </p>
            </div>

            <div className="flex items-center gap-4 mt-8">
              <button className="px-6 py-3 bg-white text-slate-900 rounded-2xl font-black text-sm hover:bg-indigo-50 transition-colors active:scale-95 shadow-md">
                Detailed Report
              </button>
              <button className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl font-bold text-sm transition-colors">
                Manage Staff
              </button>
            </div>
          </div>
        </div>

        {/* Circular Progress (Occupancy) */}
        <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm flex flex-col items-center justify-center relative group transform-gpu transition-all duration-300 hover:shadow-lg">
          <div className="relative flex items-center justify-center">
            <svg className="w-48 h-48 transform -rotate-90">
              <circle cx="96" cy="96" r="80" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-100" />
              <circle 
                cx="96" cy="96" r="80" stroke="currentColor" strokeWidth="12" fill="transparent" 
                strokeDasharray={502.6}
                strokeDashoffset={502.6 * (1 - 0.78)}
                strokeLinecap="round"
                className="text-indigo-600 transition-all duration-700 ease-out" 
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-4xl font-black text-slate-900">78%</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Occupied</span>
            </div>
          </div>
          <div className="mt-6 flex gap-8">
            <div className="text-center">
              <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Available</p>
              <p className="text-xl font-black text-slate-900">12</p>
            </div>
            <div className="w-px h-10 bg-slate-100" />
            <div className="text-center">
              <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Booked</p>
              <p className="text-xl font-black text-slate-900">42</p>
            </div>
          </div>
        </div>
      </div>

      {/* --- QUICK STATS GRID --- */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Total Bookings", value: "254", icon: DoorOpen, trend: "+12%" },
          { title: "Active Guests", value: "64", icon: Users, trend: "+5%" },
          { title: "Net Revenue", value: "$8.2K", icon: DollarSign, trend: "+18%" },
          { title: "Check-ins", value: "120", icon: TrendingUp, trend: "Stable" },
        ].map((stat, i) => (
          <div key={i} className="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm hover:shadow-lg transition-all transform-gpu group cursor-default">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-slate-50 rounded-2xl group-hover:bg-indigo-50 transition-colors">
                <stat.icon size={22} className="text-slate-400 group-hover:text-indigo-600 transition-colors" />
              </div>
              <span className="text-[10px] font-bold px-2 py-1 bg-green-50 text-green-600 rounded-lg">{stat.trend}</span>
            </div>
            <p className="text-sm font-semibold text-slate-500">{stat.title}</p>
            <h3 className="text-3xl font-black text-slate-900 mt-1 tracking-tight">{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* --- ANALYTICS & LIVE OPS --- */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Main Chart Container */}
        <div className="lg:col-span-3 bg-white border border-slate-100 rounded-3xl p-8 shadow-sm transition-shadow duration-300 hover:shadow-lg transform-gpu">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h3 className="text-xl font-black text-slate-900 tracking-tight">Booking Analytics</h3>
              <p className="text-sm text-slate-400 font-medium">Weekly reservation frequency</p>
            </div>
            <select className="bg-slate-50 border-none rounded-xl px-4 py-2 text-xs font-bold text-slate-600 outline-none cursor-pointer hover:bg-slate-100 transition-colors">
              <option>This Week</option>
              <option>Last Week</option>
            </select>
          </div>
          <ChartComponent />
        </div>

        {/* Live Operations Panel */}
        <div className="space-y-6">
          <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm h-full transform-gpu transition-shadow duration-300 hover:shadow-lg">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6 flex items-center justify-between">
              Live Ops
              <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            </h3>

            <div className="space-y-6">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Active Rooms</p>
                <div className="flex flex-wrap gap-2">
                  {["101", "102", "203", "305", "402"].map((room) => (
                    <div key={room} className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-100 text-xs font-bold text-slate-700 hover:bg-indigo-600 hover:text-white transition-all cursor-pointer">
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
                  <div key={i} className="flex justify-between items-center group cursor-pointer transition-transform hover:translate-x-1">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white shadow-sm" />
                      <span className="text-xs font-bold text-slate-800">{staff.name}</span>
                    </div>
                    <span className={`text-[10px] px-2 py-1 rounded-lg font-black uppercase ${staff.color}`}>
                      {staff.status}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                 <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-center gap-3 group cursor-pointer hover:bg-rose-100 transition-all">
                    <div className="w-10 h-10 rounded-xl bg-rose-500 flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform">
                      <Sparkles size={18} />
                    </div>
                    <div>
                      <p className="text-xs font-black text-rose-900">Alerts</p>
                      <p className="text-[10px] text-rose-700 font-bold uppercase">2 rooms pending</p>
                    </div>
                    <ArrowRight size={14} className="ml-auto text-rose-300 transition-transform group-hover:translate-x-1" />
                 </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
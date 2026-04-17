"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 md:space-y-8 animate-pulse p-1"
    >
      {/* Hero Bento Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Welcome Card Skeleton */}
        <div className="lg:col-span-2 h-64 sm:h-80 bg-slate-200 rounded-4xl" />
        
        {/* Occupancy Card Skeleton */}
        <div className="h-64 sm:h-80 bg-slate-100 rounded-4xl" />
      </div>

      {/* Stats Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div 
            key={i} 
            className="h-24 sm:h-32 bg-slate-100 rounded-[1.5rem]" 
          />
        ))}
      </div>

      {/* Analytics & Live Ops Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Chart Area */}
        <div className="lg:col-span-3 h-100 bg-slate-100 rounded-4xl" />
        
        {/* Side Panel Area */}
        <div className="h-100 bg-slate-50 rounded-4xl" />
      </div>
    </motion.div>
  );
}
"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8 animate-pulse p-2"
    >
      {/* Hero Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 h-80 bg-slate-200 rounded-3xl" />
        <div className="h-80 bg-slate-100 rounded-3xl" />
      </div>

      {/* Stats Skeleton */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-32 bg-slate-100 rounded-3xl" />
        ))}
      </div>

      {/* Table/Chart Area Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 h-96 bg-slate-100 rounded-3xl" />
        <div className="h-96 bg-slate-50 rounded-3xl" />
      </div>
    </motion.div>
  );
}
import { motion } from "motion/react";

export function LoadingSkeleton() {
  return (
    <div className="p-6">
      {/* Header Skeleton */}
      <div className="mb-8">
        <div className="h-8 w-64 bg-white/10 rounded-lg mb-2 animate-pulse" />
        <div className="h-4 w-48 bg-white/5 rounded-lg animate-pulse" />
      </div>

      {/* Stats Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-white/10 rounded-xl animate-pulse" />
              <div className="h-6 w-16 bg-white/10 rounded-lg animate-pulse" />
            </div>
            <div className="h-4 w-32 bg-white/10 rounded-lg mb-3 animate-pulse" />
            <div className="h-10 w-24 bg-white/10 rounded-lg animate-pulse" />
          </motion.div>
        ))}
      </div>

      {/* Content Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 h-96 animate-pulse" />
        </div>
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 h-96 animate-pulse" />
      </div>
    </div>
  );
}

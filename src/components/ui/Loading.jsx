import React from "react";
import { motion } from "framer-motion";

const Loading = () => {
  const skeletonItems = Array.from({ length: 6 });

  return (
    <div className="space-y-4">
      {skeletonItems.map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-xl p-4 shadow-sm border border-gray-200"
        >
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 bg-gray-200 rounded animate-pulse mt-1" />
            <div className="flex-1 space-y-3">
              <div className="flex items-center justify-between">
                <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse w-3/4" />
                <div className="flex gap-2">
                  <div className="w-6 h-6 bg-gray-200 rounded animate-pulse" />
                  <div className="w-6 h-6 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>
              <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse w-1/2" />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full animate-pulse w-16" />
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-gray-200 rounded-full animate-pulse" />
                    <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse w-12" />
                  </div>
                </div>
                <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse w-16" />
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Loading;
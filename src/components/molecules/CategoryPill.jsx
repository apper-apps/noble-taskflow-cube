import React from "react";
import { cn } from "@/utils/cn";

const CategoryPill = ({ category, isActive, onClick, showCount = false }) => {
  const handleClick = () => {
    if (onClick) {
      onClick(category.id);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        "flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1",
        isActive 
          ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg" 
          : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
      )}
    >
      <div className="flex items-center gap-2">
        <div 
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: category.color }}
        />
<span>{category.name_c}</span>
      </div>
      {showCount && (
        <span className={cn(
          "ml-2 px-2 py-0.5 rounded-full text-xs",
          isActive 
            ? "bg-white/20 text-white" 
            : "bg-gray-100 text-gray-600"
        )}>
{category.task_count_c || 0}
        </span>
      )}
    </button>
  );
};

export default CategoryPill;
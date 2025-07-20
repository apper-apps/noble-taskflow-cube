import React from "react";
import { cn } from "@/utils/cn";

const PriorityBadge = ({ priority, showPulse = false }) => {
  const priorityConfig = {
    high: {
      color: "bg-red-500",
      label: "High",
      textColor: "text-red-700",
      bgColor: "bg-red-50"
    },
    medium: {
      color: "bg-amber-500",
      label: "Medium", 
      textColor: "text-amber-700",
      bgColor: "bg-amber-50"
    },
    low: {
      color: "bg-green-500",
      label: "Low",
      textColor: "text-green-700",
      bgColor: "bg-green-50"
    }
  };

  const config = priorityConfig[priority] || priorityConfig.low;

  return (
    <div className="flex items-center gap-2">
      <div className={cn(
        "w-3 h-3 rounded-full",
        config.color,
        showPulse && priority === "high" && "priority-pulse"
      )} />
      <span className={cn(
        "text-xs font-medium px-2 py-1 rounded-full",
        config.textColor,
        config.bgColor
      )}>
        {config.label}
      </span>
    </div>
  );
};

export default PriorityBadge;
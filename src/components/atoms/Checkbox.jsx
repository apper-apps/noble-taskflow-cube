import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Checkbox = forwardRef(({ 
  className, 
  checked,
  onChange,
  ...props 
}, ref) => {
  return (
    <button
      type="button"
      className={cn(
        "w-5 h-5 rounded border-2 border-gray-300 flex items-center justify-center transition-all duration-200 hover:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1",
        checked && "bg-gradient-to-br from-primary-500 to-primary-600 border-primary-500 completion-pulse",
        className
      )}
      onClick={onChange}
      ref={ref}
      {...props}
    >
      {checked && (
        <ApperIcon 
          name="Check" 
          size={14} 
          className="text-white animate-scale-in"
        />
      )}
    </button>
  );
});

Checkbox.displayName = "Checkbox";

export default Checkbox;
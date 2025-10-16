import React from "react";
import { motion } from "framer-motion";
import { format, isPast, isToday, isTomorrow } from "date-fns";
import { toast } from "react-toastify";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";
import Checkbox from "@/components/atoms/Checkbox";
import PriorityBadge from "@/components/molecules/PriorityBadge";

const TaskCard = ({ task, category, onToggleComplete, onEdit, onDelete }) => {
  const handleToggleComplete = () => {
    onToggleComplete(task.Id);
    if (!task.completed) {
      toast.success("Task completed! 🎉", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

const isDueSoon = () => {
    if (!task.due_date_c) return false;
    const dueDate = new Date(task.due_date_c);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    return dueDate <= tomorrow && dueDate >= today;
  };

  const isOverdue = () => {
    if (!task.due_date_c) return false;
    const dueDate = new Date(task.due_date_c);
    const today = new Date();
    return dueDate < today && !task.completed_c;
  };

  const formatDueDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    if (isToday(date)) return "Today";
    if (isTomorrow(date)) return "Tomorrow";
    return format(date, "MMM d, yyyy");
  };

  const dueDateDisplay = formatDueDate(task.due_date_c);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
      whileHover={{ scale: 1.02, y: -2 }}
      className={cn(
        "group bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-200 cursor-pointer",
        task.completed && "opacity-75 bg-gray-50"
      )}
    >
<div className="flex items-start gap-3">
        <div className="mt-1">
          <Checkbox 
            checked={task.completed_c}
            onChange={handleToggleComplete}
            aria-label="Mark as complete"
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 
              className={cn(
                "text-base font-semibold text-gray-900 transition-all duration-200 leading-tight",
                task.completed_c && "line-through text-gray-500"
              )}>
              {task.title_c}
            </h3>
</div>
          
          {task.description_c && (
            <p className={cn(
              "text-sm text-gray-600 mt-1 line-clamp-2",
              task.completed_c && "text-gray-400"
            )}>
              {task.description_c}
            </p>
          )}
          
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(task);
                }}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors duration-200"
              >
                <ApperIcon name="Edit2" size={14} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(task.Id);
                }}
                className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors duration-200"
              >
                <ApperIcon name="Trash2" size={14} />
</button>
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center gap-3">
          <PriorityBadge
priority={task.priority_c} 
                showPulse={!task.completed_c}
              />
              
              {category && (
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-gray-100">
                  <div 
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: category.color_c }}
                  />
                  <span className="text-xs text-gray-700">
                    {category.name_c}
                  </span>
                </div>
)}
          </div>
          
          {dueDateDisplay && (
            <div className={cn(
              "flex items-center gap-1 text-xs font-medium",
              isOverdue() && "text-red-600",
                isDueSoon() && !isOverdue() && "text-amber-600",
                task.completed_c && "text-gray-400",
                !isDueSoon() && !isOverdue() && !task.completed_c && "text-gray-500"
              )}>
                <ApperIcon 
                  name="Calendar" 
                  size={12} 
                  className={cn(
                    isOverdue() && "text-red-500",
                    isDueSoon() && !isOverdue() && "text-amber-500"
                  )}
                />
<span>{dueDateDisplay}</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default TaskCard;
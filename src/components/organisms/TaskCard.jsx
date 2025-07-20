import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import { format, isToday, isTomorrow, isPast } from "date-fns";
import { toast } from "react-toastify";
import Checkbox from "@/components/atoms/Checkbox";
import PriorityBadge from "@/components/molecules/PriorityBadge";
import ApperIcon from "@/components/ApperIcon";

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

  const formatDueDate = (dateStr) => {
    if (!dateStr) return null;
    
    const date = new Date(dateStr);
    if (isToday(date)) return "Today";
    if (isTomorrow(date)) return "Tomorrow";
    return format(date, "MMM d");
  };

  const isDueSoon = () => {
    if (!task.dueDate) return false;
    const date = new Date(task.dueDate);
    return (isToday(date) || isTomorrow(date)) && !task.completed;
  };

  const isOverdue = () => {
    if (!task.dueDate) return false;
    const date = new Date(task.dueDate);
    return isPast(date) && !isToday(date) && !task.completed;
  };

  const dueDateDisplay = formatDueDate(task.dueDate);

  return (
    <motion.div
      layout
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
            checked={task.completed}
            onChange={handleToggleComplete}
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h3 className={cn(
                "font-medium text-gray-900 transition-all duration-200",
                task.completed && "line-through text-gray-500"
              )}>
                {task.title}
              </h3>
              
              {task.description && (
                <p className={cn(
                  "text-sm text-gray-600 mt-1 line-clamp-2",
                  task.completed && "text-gray-400"
                )}>
                  {task.description}
                </p>
              )}
            </div>
            
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
          
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-3">
              <PriorityBadge 
                priority={task.priority} 
                showPulse={!task.completed}
              />
              
              {category && (
                <div className="flex items-center gap-1">
                  <div 
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: category.color }}
                  />
                  <span className="text-xs text-gray-500 font-medium">
                    {category.name}
                  </span>
                </div>
              )}
            </div>
            
            {dueDateDisplay && (
              <div className={cn(
                "flex items-center gap-1 text-xs font-medium",
                isOverdue() && "text-red-600",
                isDueSoon() && !isOverdue() && "text-amber-600",
                task.completed && "text-gray-400",
                !isDueSoon() && !isOverdue() && !task.completed && "text-gray-500"
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
      </div>
    </motion.div>
  );
};

export default TaskCard;
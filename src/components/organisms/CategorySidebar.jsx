import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import Button from "@/components/atoms/Button";
import CategoryPill from "@/components/molecules/CategoryPill";
import ProgressRing from "@/components/molecules/ProgressRing";
import ApperIcon from "@/components/ApperIcon";

const CategorySidebar = ({ 
  categories, 
  activeCategory, 
  onCategoryChange, 
  totalTasks, 
  completedTasks,
  onAddCategory 
}) => {
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  const predefinedColors = [
    "#EF4444", "#F97316", "#F59E0B", "#10B981", 
    "#06B6D4", "#3B82F6", "#6366F1", "#8B5CF6", 
    "#EC4899", "#F43F5E"
  ];

  const getRandomColor = () => {
    return predefinedColors[Math.floor(Math.random() * predefinedColors.length)];
  };

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;

const newCategory = {
      name_c: newCategoryName.trim(),
      color_c: getRandomColor(),
      task_count_c: 0
    };

    onAddCategory(newCategory);
    setNewCategoryName("");
    setIsAddingCategory(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-full">
      {/* Progress Section */}
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <ProgressRing progress={progress} size={80} strokeWidth={6} />
        </div>
        <h2 className="text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
          Today's Progress
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          {completedTasks} of {totalTasks} tasks completed
        </p>
      </div>

      {/* Filter Buttons */}
      <div className="space-y-2 mb-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Filters</h3>
        
        <button
          onClick={() => onCategoryChange("all")}
          className={cn(
            "w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105",
            activeCategory === "all"
              ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg"
              : "bg-gray-50 text-gray-700 hover:bg-gray-100"
          )}
        >
          <div className="flex items-center gap-2">
            <ApperIcon name="List" size={16} />
            <span>All Tasks</span>
          </div>
          <span className={cn(
            "px-2 py-0.5 rounded-full text-xs",
            activeCategory === "all"
              ? "bg-white/20 text-white"
              : "bg-gray-200 text-gray-600"
          )}>
            {totalTasks}
          </span>
        </button>

        <button
          onClick={() => onCategoryChange("active")}
          className={cn(
            "w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105",
            activeCategory === "active"
              ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg"
              : "bg-gray-50 text-gray-700 hover:bg-gray-100"
          )}
        >
          <div className="flex items-center gap-2">
            <ApperIcon name="Clock" size={16} />
            <span>Active</span>
          </div>
          <span className={cn(
            "px-2 py-0.5 rounded-full text-xs",
            activeCategory === "active"
              ? "bg-white/20 text-white"
              : "bg-gray-200 text-gray-600"
          )}>
            {totalTasks - completedTasks}
          </span>
        </button>

        <button
          onClick={() => onCategoryChange("completed")}
          className={cn(
            "w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105",
            activeCategory === "completed"
              ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg"
              : "bg-gray-50 text-gray-700 hover:bg-gray-100"
          )}
        >
          <div className="flex items-center gap-2">
            <ApperIcon name="CheckCircle" size={16} />
            <span>Completed</span>
          </div>
          <span className={cn(
            "px-2 py-0.5 rounded-full text-xs",
            activeCategory === "completed"
              ? "bg-white/20 text-white"
              : "bg-gray-200 text-gray-600"
          )}>
            {completedTasks}
          </span>
        </button>
      </div>

      {/* Categories */}
      <div className="space-y-2">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-700">Categories</h3>
          <button
            onClick={() => setIsAddingCategory(true)}
            className="p-1.5 rounded-lg text-gray-400 hover:text-primary-600 hover:bg-primary-50 transition-colors duration-200"
          >
            <ApperIcon name="Plus" size={16} />
          </button>
        </div>

        {isAddingCategory && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            onSubmit={handleAddCategory}
            className="space-y-2 p-3 bg-gray-50 rounded-lg"
          >
            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="Category name"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              autoFocus
            />
            <div className="flex gap-2">
              <Button type="submit" size="sm" className="flex-1">
                Add
              </Button>
              <Button 
                type="button" 
                variant="secondary" 
                size="sm"
                onClick={() => {
                  setIsAddingCategory(false);
                  setNewCategoryName("");
                }}
              >
                Cancel
              </Button>
            </div>
          </motion.form>
        )}

        <div className="space-y-2">
          {categories.map(category => (
            <CategoryPill
              key={category.Id}
              category={category}
              isActive={activeCategory === category.Id}
              onClick={onCategoryChange}
              showCount={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategorySidebar;
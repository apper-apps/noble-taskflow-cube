import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Button from "@/components/atoms/Button";
import FormField from "@/components/molecules/FormField";
import Select from "@/components/atoms/Select";
import ApperIcon from "@/components/ApperIcon";

const QuickAddForm = ({ categories, onAddTask, isExpanded, onToggleExpanded }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    categoryId: "",
    priority: "medium",
    dueDate: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      toast.error("Please enter a task title");
      return;
    }

    const newTask = {
      ...formData,
      title: formData.title.trim(),
      description: formData.description.trim(),
      dueDate: formData.dueDate || null
    };

    onAddTask(newTask);
    setFormData({
      title: "",
      description: "",
      categoryId: "",
      priority: "medium",
      dueDate: ""
    });
    
    toast.success("Task added successfully!");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      handleSubmit(e);
    }
  };

  return (
    <motion.div 
      layout
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6"
    >
      <button
        onClick={onToggleExpanded}
        className="w-full flex items-center justify-between text-left p-2 hover:bg-gray-50 rounded-lg transition-colors duration-200"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
            <ApperIcon name="Plus" size={16} className="text-white" />
          </div>
          <span className="font-medium text-gray-900">Quick Add Task</span>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ApperIcon name="ChevronDown" size={20} className="text-gray-400" />
        </motion.div>
      </button>

      <motion.div
        initial={false}
        animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <FormField
            label="Task Title"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            onKeyPress={handleKeyPress}
            placeholder="What needs to be done?"
          />

          <FormField
            label="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Add more details (optional)"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField label="Category">
              <Select
                value={formData.categoryId}
                onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
              >
                <option value="">No category</option>
                {categories.map(category => (
                  <option key={category.Id} value={category.Id}>
                    {category.name}
                  </option>
                ))}
              </Select>
            </FormField>

            <FormField label="Priority">
              <Select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </Select>
            </FormField>

            <FormField
              label="Due Date"
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <p className="text-xs text-gray-500">
              Tip: Press Cmd/Ctrl + Enter to add quickly
            </p>
            <div className="flex gap-2">
              <Button 
                type="button" 
                variant="secondary" 
                onClick={onToggleExpanded}
              >
                Cancel
              </Button>
              <Button type="submit">
                <ApperIcon name="Plus" size={16} className="mr-2" />
                Add Task
              </Button>
            </div>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default QuickAddForm;
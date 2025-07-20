import React from "react";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "No tasks yet", 
  description = "Start by adding your first task to get organized!",
  actionLabel = "Add Your First Task",
  onAction,
  icon = "CheckSquare"
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl p-12 shadow-sm border border-gray-200 text-center"
    >
      <div className="w-20 h-20 bg-gradient-to-r from-primary-100 to-primary-200 rounded-full flex items-center justify-center mx-auto mb-6">
        <ApperIcon name={icon} size={40} className="text-primary-500" />
      </div>
      
      <h3 className="text-xl font-bold text-gray-900 mb-3">
        {title}
      </h3>
      
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        {description}
      </p>
      
      {onAction && (
        <Button onClick={onAction} size="lg" className="mx-auto">
          <ApperIcon name="Plus" size={20} className="mr-2" />
          {actionLabel}
        </Button>
      )}
      
      <div className="mt-8 flex items-center justify-center gap-6 text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <ApperIcon name="Zap" size={16} className="text-primary-400" />
          <span>Quick add with Cmd+Enter</span>
        </div>
        <div className="flex items-center gap-2">
          <ApperIcon name="Target" size={16} className="text-accent-400" />
          <span>Track your progress</span>
        </div>
      </div>
    </motion.div>
  );
};

export default Empty;
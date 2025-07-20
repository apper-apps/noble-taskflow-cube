import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import TaskCard from "@/components/organisms/TaskCard";

const TaskList = ({ tasks, categories, onToggleComplete, onEditTask, onDeleteTask }) => {
  const getCategoryById = (categoryId) => {
    return categories.find(cat => cat.Id === parseInt(categoryId));
  };

  return (
    <div className="space-y-4">
      <AnimatePresence mode="popLayout">
        {tasks.map((task, index) => (
          <motion.div
            key={task.Id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              transition: { delay: index * 0.05 }
            }}
            exit={{ 
              opacity: 0, 
              x: 20,
              transition: { duration: 0.2 }
            }}
            layout
          >
            <TaskCard
              task={task}
              category={getCategoryById(task.categoryId)}
              onToggleComplete={onToggleComplete}
              onEdit={onEditTask}
              onDelete={onDeleteTask}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default TaskList;
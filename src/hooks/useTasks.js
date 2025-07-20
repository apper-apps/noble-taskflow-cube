import { useState, useEffect } from "react";
import taskService from "@/services/api/taskService";

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await taskService.getAll();
      setTasks(data);
    } catch (err) {
      setError(err.message || "Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (taskData) => {
    try {
      const newTask = await taskService.create(taskData);
      setTasks(prev => [...prev, newTask]);
      return newTask;
    } catch (err) {
      throw new Error(err.message || "Failed to add task");
    }
  };

  const updateTask = async (id, updates) => {
    try {
      const updatedTask = await taskService.update(id, updates);
      setTasks(prev => prev.map(task => 
        task.Id === parseInt(id) ? updatedTask : task
      ));
      return updatedTask;
    } catch (err) {
      throw new Error(err.message || "Failed to update task");
    }
  };

  const deleteTask = async (id) => {
    try {
      await taskService.delete(id);
      setTasks(prev => prev.filter(task => task.Id !== parseInt(id)));
    } catch (err) {
      throw new Error(err.message || "Failed to delete task");
    }
  };

  const toggleTaskComplete = async (id) => {
    try {
      const task = tasks.find(t => t.Id === parseInt(id));
      if (!task) return;
      
      const updatedTask = await taskService.update(id, { 
        completed: !task.completed 
      });
      
      setTasks(prev => prev.map(t => 
        t.Id === parseInt(id) ? updatedTask : t
      ));
      
      return updatedTask;
    } catch (err) {
      throw new Error(err.message || "Failed to toggle task");
    }
  };

  const clearCompleted = async () => {
    try {
      const deletedCount = await taskService.deleteCompleted();
      setTasks(prev => prev.filter(task => !task.completed));
      return deletedCount;
    } catch (err) {
      throw new Error(err.message || "Failed to clear completed tasks");
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return {
    tasks,
    loading,
    error,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskComplete,
    clearCompleted,
    refetch: loadTasks
  };
};
import React, { useState, useMemo } from "react";
import { toast } from "react-toastify";
import { useTasks } from "@/hooks/useTasks";
import { useCategories } from "@/hooks/useCategories";
import Header from "@/components/organisms/Header";
import CategorySidebar from "@/components/organisms/CategorySidebar";
import QuickAddForm from "@/components/organisms/QuickAddForm";
import TaskList from "@/components/organisms/TaskList";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";

const TaskManager = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [isQuickAddExpanded, setIsQuickAddExpanded] = useState(false);

  const { 
    tasks, 
    loading: tasksLoading, 
    error: tasksError, 
    addTask, 
    updateTask, 
    deleteTask, 
    toggleTaskComplete, 
    clearCompleted,
    refetch: refetchTasks
  } = useTasks();

  const { 
    categories, 
    loading: categoriesLoading, 
    error: categoriesError, 
    addCategory,
    refetch: refetchCategories
  } = useCategories();

const filteredTasks = useMemo(() => {
    if (activeCategory === "all") return tasks;
    if (activeCategory === "active") return tasks.filter(task => !task.completed_c);
    if (activeCategory === "completed") return tasks.filter(task => task.completed_c);
    return tasks.filter(task => {
      const categoryId = task.category_id_c?.Id || task.category_id_c;
      return categoryId === parseInt(activeCategory);
    });
  }, [tasks, activeCategory]);

const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed_c).length;

  const handleAddTask = async (taskData) => {
    try {
      await addTask(taskData);
      setIsQuickAddExpanded(false);
      await refetchCategories(); // Update category counts
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleToggleComplete = async (id) => {
    try {
      await toggleTaskComplete(id);
      await refetchCategories(); // Update category counts
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      await refetchCategories(); // Update category counts
      toast.success("Task deleted successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleEditTask = (task) => {
    // For now, just show a toast - editing would require a modal
    toast.info("Task editing feature coming soon!");
  };

  const handleClearCompleted = async () => {
    try {
      const deletedCount = await clearCompleted();
      await refetchCategories(); // Update category counts
      toast.success(`${deletedCount} completed tasks cleared`);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleAddCategory = async (categoryData) => {
    try {
      await addCategory(categoryData);
      toast.success("Category added successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
  };

  if (tasksLoading || categoriesLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-3">
              <div className="bg-white rounded-xl p-6 h-96">
                <div className="animate-pulse space-y-4">
                  <div className="h-20 bg-gray-200 rounded-full mx-auto w-20"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
                  <div className="space-y-2">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="h-10 bg-gray-200 rounded"></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-12 lg:col-span-9">
              <Loading />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (tasksError || categoriesError) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <Error 
            message={tasksError || categoriesError} 
            onRetry={() => {
              refetchTasks();
              refetchCategories();
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="col-span-12 lg:col-span-3">
            <CategorySidebar
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={handleCategoryChange}
              totalTasks={totalTasks}
              completedTasks={completedTasks}
              onAddCategory={handleAddCategory}
            />
          </div>

          {/* Main Content */}
          <div className="col-span-12 lg:col-span-9">
            <Header
              totalTasks={totalTasks}
              completedTasks={completedTasks}
              onClearCompleted={handleClearCompleted}
            />

            <QuickAddForm
              categories={categories}
              onAddTask={handleAddTask}
              isExpanded={isQuickAddExpanded}
              onToggleExpanded={setIsQuickAddExpanded}
            />

            {filteredTasks.length === 0 ? (
              <Empty
                title={activeCategory === "completed" ? "No completed tasks" : 
                       activeCategory === "active" ? "No active tasks" : 
                       "No tasks yet"}
                description={activeCategory === "completed" ? "Complete some tasks to see them here!" :
                            activeCategory === "active" ? "All tasks are completed! Great work!" :
                            "Start by adding your first task to get organized!"}
                actionLabel="Add Your First Task"
                onAction={() => setIsQuickAddExpanded(true)}
                icon={activeCategory === "completed" ? "CheckCircle" : 
                      activeCategory === "active" ? "Clock" : 
                      "CheckSquare"}
              />
            ) : (
              <TaskList
                tasks={filteredTasks}
                categories={categories}
                onToggleComplete={handleToggleComplete}
                onEditTask={handleEditTask}
                onDeleteTask={handleDeleteTask}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskManager;
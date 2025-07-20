import tasksData from "@/services/mockData/tasks.json";

class TaskService {
  constructor() {
    this.tasks = [...tasksData];
  }

  async getAll() {
    await this.delay(300);
    return [...this.tasks];
  }

  async getById(id) {
    await this.delay(200);
    const task = this.tasks.find(task => task.Id === parseInt(id));
    if (!task) {
      throw new Error("Task not found");
    }
    return { ...task };
  }

  async create(taskData) {
    await this.delay(400);
    const newId = Math.max(...this.tasks.map(task => task.Id), 0) + 1;
    const newTask = {
      Id: newId,
      ...taskData,
      completed: false,
      createdAt: new Date().toISOString(),
      completedAt: null
    };
    this.tasks.push(newTask);
    return { ...newTask };
  }

  async update(id, updates) {
    await this.delay(300);
    const taskIndex = this.tasks.findIndex(task => task.Id === parseInt(id));
    if (taskIndex === -1) {
      throw new Error("Task not found");
    }

    const updatedTask = {
      ...this.tasks[taskIndex],
      ...updates
    };

    // If marking as completed, add completion timestamp
    if (updates.completed && !this.tasks[taskIndex].completed) {
      updatedTask.completedAt = new Date().toISOString();
    }

    // If marking as incomplete, remove completion timestamp
    if (updates.completed === false) {
      updatedTask.completedAt = null;
    }

    this.tasks[taskIndex] = updatedTask;
    return { ...updatedTask };
  }

  async delete(id) {
    await this.delay(250);
    const taskIndex = this.tasks.findIndex(task => task.Id === parseInt(id));
    if (taskIndex === -1) {
      throw new Error("Task not found");
    }
    
    const deletedTask = this.tasks.splice(taskIndex, 1)[0];
    return { ...deletedTask };
  }

  async getByCategory(categoryId) {
    await this.delay(300);
    const filtered = this.tasks.filter(task => task.categoryId === categoryId.toString());
    return [...filtered];
  }

  async getByStatus(completed) {
    await this.delay(300);
    const filtered = this.tasks.filter(task => task.completed === completed);
    return [...filtered];
  }

  async deleteCompleted() {
    await this.delay(400);
    const completedTasks = this.tasks.filter(task => task.completed);
    this.tasks = this.tasks.filter(task => !task.completed);
    return completedTasks.length;
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export default new TaskService();
import categoriesData from "@/services/mockData/categories.json";
import taskService from "@/services/api/taskService";

class CategoryService {
  constructor() {
    this.categories = [...categoriesData];
  }

  async getAll() {
    await this.delay(250);
    // Update task counts dynamically
    const tasks = await taskService.getAll();
    const updatedCategories = this.categories.map(category => ({
      ...category,
      taskCount: tasks.filter(task => task.categoryId === category.Id.toString()).length
    }));
    
    return [...updatedCategories];
  }

  async getById(id) {
    await this.delay(200);
    const category = this.categories.find(cat => cat.Id === parseInt(id));
    if (!category) {
      throw new Error("Category not found");
    }
    return { ...category };
  }

  async create(categoryData) {
    await this.delay(350);
    const newId = Math.max(...this.categories.map(cat => cat.Id), 0) + 1;
    const newCategory = {
      Id: newId,
      ...categoryData,
      taskCount: 0
    };
    this.categories.push(newCategory);
    return { ...newCategory };
  }

  async update(id, updates) {
    await this.delay(300);
    const categoryIndex = this.categories.findIndex(cat => cat.Id === parseInt(id));
    if (categoryIndex === -1) {
      throw new Error("Category not found");
    }

    const updatedCategory = {
      ...this.categories[categoryIndex],
      ...updates
    };

    this.categories[categoryIndex] = updatedCategory;
    return { ...updatedCategory };
  }

  async delete(id) {
    await this.delay(250);
    const categoryIndex = this.categories.findIndex(cat => cat.Id === parseInt(id));
    if (categoryIndex === -1) {
      throw new Error("Category not found");
    }
    
    const deletedCategory = this.categories.splice(categoryIndex, 1)[0];
    return { ...deletedCategory };
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export default new CategoryService();
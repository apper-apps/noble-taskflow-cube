class CategoryService {
  constructor() {
    const { ApperClient } = window.ApperSDK;
    this.apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    this.tableName = 'category_c';
  }

  async getAll() {
    try {
      const params = {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "color_c"}},
          {"field": {"Name": "task_count_c"}}
        ],
        aggregators: [{
          id: "taskCount",
          fields: [{"field": {"Name": "Id"}, "Function": "Count"}],
          where: []
        }]
      };
      
      const response = await this.apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      return response.data || [];
    } catch (error) {
      console.error("Error fetching categories:", error?.response?.data?.message || error.message);
      throw new Error(error?.response?.data?.message || error.message || "Failed to load categories");
    }
  }

  async getById(id) {
    try {
      const params = {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "color_c"}},
          {"field": {"Name": "task_count_c"}}
        ]
      };
      
      const response = await this.apperClient.getRecordById(this.tableName, parseInt(id), params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (!response.data) {
        throw new Error("Category not found");
      }
      
      return response.data;
    } catch (error) {
      console.error(`Error fetching category ${id}:`, error?.response?.data?.message || error.message);
      throw new Error(error?.response?.data?.message || error.message || "Failed to load category");
    }
  }

  async create(categoryData) {
    try {
      const params = {
        records: [{
          name_c: categoryData.name_c || "",
          color_c: categoryData.color_c || "#5B47E0",
          task_count_c: 0
        }]
      };
      
      const response = await this.apperClient.createRecord(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to create ${failed.length} records:`, JSON.stringify(failed));
          failed.forEach(record => {
            if (record.errors) {
              record.errors.forEach(error => {
                throw new Error(`${error.fieldLabel}: ${error.message}`);
              });
            }
            if (record.message) {
              throw new Error(record.message);
            }
          });
        }
        
        return successful[0]?.data || null;
      }
      
      return null;
    } catch (error) {
      console.error("Error creating category:", error?.response?.data?.message || error.message);
      throw new Error(error?.response?.data?.message || error.message || "Failed to create category");
    }
  }

  async update(id, updates) {
    try {
      const updatePayload = {
        Id: parseInt(id)
      };
      
      if (updates.name_c !== undefined) updatePayload.name_c = updates.name_c;
      if (updates.color_c !== undefined) updatePayload.color_c = updates.color_c;
      if (updates.task_count_c !== undefined) updatePayload.task_count_c = updates.task_count_c;
      
      const params = {
        records: [updatePayload]
      };
      
      const response = await this.apperClient.updateRecord(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to update ${failed.length} records:`, JSON.stringify(failed));
          failed.forEach(record => {
            if (record.errors) {
              record.errors.forEach(error => {
                throw new Error(`${error.fieldLabel}: ${error.message}`);
              });
            }
            if (record.message) {
              throw new Error(record.message);
            }
          });
        }
        
        return successful[0]?.data || null;
      }
      
      return null;
    } catch (error) {
      console.error(`Error updating category ${id}:`, error?.response?.data?.message || error.message);
      throw new Error(error?.response?.data?.message || error.message || "Failed to update category");
    }
  }

  async delete(id) {
    try {
      const params = {
        RecordIds: [parseInt(id)]
      };
      
      const response = await this.apperClient.deleteRecord(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to delete ${failed.length} records:`, JSON.stringify(failed));
          failed.forEach(record => {
            if (record.message) {
              throw new Error(record.message);
            }
          });
        }
        
        return true;
      }
      
      return false;
    } catch (error) {
      console.error(`Error deleting category ${id}:`, error?.response?.data?.message || error.message);
      throw new Error(error?.response?.data?.message || error.message || "Failed to delete category");
    }
  }
}

export default new CategoryService();
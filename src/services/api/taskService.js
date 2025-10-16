class TaskService {
  constructor() {
    const { ApperClient } = window.ApperSDK;
    this.apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    this.tableName = 'task_c';
  }

  async getAll() {
    try {
      const params = {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "priority_c"}},
          {"field": {"Name": "due_date_c"}},
          {"field": {"Name": "completed_c"}},
          {"field": {"Name": "completed_at_c"}},
          {"field": {"Name": "created_at_c"}},
          {"field": {"Name": "category_id_c"}}
        ],
        orderBy: [{"fieldName": "created_at_c", "sorttype": "DESC"}]
      };
      
      const response = await this.apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      return response.data || [];
    } catch (error) {
      console.error("Error fetching tasks:", error?.response?.data?.message || error.message);
      throw new Error(error?.response?.data?.message || error.message || "Failed to load tasks");
    }
  }

  async getById(id) {
    try {
      const params = {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "priority_c"}},
          {"field": {"Name": "due_date_c"}},
          {"field": {"Name": "completed_c"}},
          {"field": {"Name": "completed_at_c"}},
          {"field": {"Name": "created_at_c"}},
          {"field": {"Name": "category_id_c"}}
        ]
      };
      
      const response = await this.apperClient.getRecordById(this.tableName, parseInt(id), params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (!response.data) {
        throw new Error("Task not found");
      }
      
      return response.data;
    } catch (error) {
      console.error(`Error fetching task ${id}:`, error?.response?.data?.message || error.message);
      throw new Error(error?.response?.data?.message || error.message || "Failed to load task");
    }
  }

  async create(taskData) {
    try {
      const params = {
        records: [{
          title_c: taskData.title_c || "",
          description_c: taskData.description_c || "",
          priority_c: taskData.priority_c || "medium",
          due_date_c: taskData.due_date_c || null,
          completed_c: false,
          completed_at_c: null,
          created_at_c: new Date().toISOString(),
          category_id_c: taskData.category_id_c ? parseInt(taskData.category_id_c) : null
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
      console.error("Error creating task:", error?.response?.data?.message || error.message);
      throw new Error(error?.response?.data?.message || error.message || "Failed to create task");
    }
  }

  async update(id, updates) {
    try {
      const updatePayload = {
        Id: parseInt(id)
      };
      
      if (updates.title_c !== undefined) updatePayload.title_c = updates.title_c;
      if (updates.description_c !== undefined) updatePayload.description_c = updates.description_c;
      if (updates.priority_c !== undefined) updatePayload.priority_c = updates.priority_c;
      if (updates.due_date_c !== undefined) updatePayload.due_date_c = updates.due_date_c;
      if (updates.completed_c !== undefined) {
        updatePayload.completed_c = updates.completed_c;
        if (updates.completed_c) {
          updatePayload.completed_at_c = new Date().toISOString();
        } else {
          updatePayload.completed_at_c = null;
        }
      }
      if (updates.category_id_c !== undefined) {
        updatePayload.category_id_c = updates.category_id_c ? parseInt(updates.category_id_c) : null;
      }
      
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
      console.error(`Error updating task ${id}:`, error?.response?.data?.message || error.message);
      throw new Error(error?.response?.data?.message || error.message || "Failed to update task");
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
      console.error(`Error deleting task ${id}:`, error?.response?.data?.message || error.message);
      throw new Error(error?.response?.data?.message || error.message || "Failed to delete task");
    }
  }

  async getByCategory(categoryId) {
    try {
      const params = {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "priority_c"}},
          {"field": {"Name": "due_date_c"}},
          {"field": {"Name": "completed_c"}},
          {"field": {"Name": "completed_at_c"}},
          {"field": {"Name": "created_at_c"}},
          {"field": {"Name": "category_id_c"}}
        ],
        where: [
          {"FieldName": "category_id_c", "Operator": "EqualTo", "Values": [parseInt(categoryId)]}
        ],
        orderBy: [{"fieldName": "created_at_c", "sorttype": "DESC"}]
      };
      
      const response = await this.apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      return response.data || [];
    } catch (error) {
      console.error(`Error fetching tasks for category ${categoryId}:`, error?.response?.data?.message || error.message);
      throw new Error(error?.response?.data?.message || error.message || "Failed to load tasks");
    }
  }

  async getByStatus(completed) {
    try {
      const params = {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "priority_c"}},
          {"field": {"Name": "due_date_c"}},
          {"field": {"Name": "completed_c"}},
          {"field": {"Name": "completed_at_c"}},
          {"field": {"Name": "created_at_c"}},
          {"field": {"Name": "category_id_c"}}
        ],
        where: [
          {"FieldName": "completed_c", "Operator": "EqualTo", "Values": [completed]}
        ],
        orderBy: [{"fieldName": "created_at_c", "sorttype": "DESC"}]
      };
      
      const response = await this.apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      return response.data || [];
    } catch (error) {
      console.error(`Error fetching tasks by status:`, error?.response?.data?.message || error.message);
      throw new Error(error?.response?.data?.message || error.message || "Failed to load tasks");
    }
  }

  async deleteCompleted() {
    try {
      const completedTasks = await this.getByStatus(true);
      
      if (completedTasks.length === 0) {
        return 0;
      }
      
      const params = {
        RecordIds: completedTasks.map(task => task.Id)
      };
      
      const response = await this.apperClient.deleteRecord(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const successful = response.results.filter(r => r.success);
        return successful.length;
      }
      
      return 0;
    } catch (error) {
      console.error("Error deleting completed tasks:", error?.response?.data?.message || error.message);
      throw new Error(error?.response?.data?.message || error.message || "Failed to delete completed tasks");
    }
  }
}

export default new TaskService();
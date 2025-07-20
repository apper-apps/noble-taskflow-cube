import { useState, useEffect } from "react";
import categoryService from "@/services/api/categoryService";

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadCategories = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await categoryService.getAll();
      setCategories(data);
    } catch (err) {
      setError(err.message || "Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  const addCategory = async (categoryData) => {
    try {
      const newCategory = await categoryService.create(categoryData);
      setCategories(prev => [...prev, newCategory]);
      return newCategory;
    } catch (err) {
      throw new Error(err.message || "Failed to add category");
    }
  };

  const updateCategory = async (id, updates) => {
    try {
      const updatedCategory = await categoryService.update(id, updates);
      setCategories(prev => prev.map(cat => 
        cat.Id === parseInt(id) ? updatedCategory : cat
      ));
      return updatedCategory;
    } catch (err) {
      throw new Error(err.message || "Failed to update category");
    }
  };

  const deleteCategory = async (id) => {
    try {
      await categoryService.delete(id);
      setCategories(prev => prev.filter(cat => cat.Id !== parseInt(id)));
    } catch (err) {
      throw new Error(err.message || "Failed to delete category");
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return {
    categories,
    loading,
    error,
    addCategory,
    updateCategory,
    deleteCategory,
    refetch: loadCategories
  };
};
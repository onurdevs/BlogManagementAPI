const Category = require("../models/Category");

const createCategory = async (data) => await Category.create(data);
const getAllCategories = async () => await Category.find();
const getCategoryBySlug = async (slug) => await Category.findOne({ slug });
const updateCategory = async (id, data) => await Category.findByIdAndUpdate(id, data, { new: true });
const deleteCategory = async (id) => await Category.findByIdAndDelete(id);

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryBySlug,
  updateCategory,
  deleteCategory,
};

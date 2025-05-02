const slugify = require("slugify");
const CategoryRepo = require("../repository/categoryRepository");

const create = async (data) => {
  const slug = slugify(data.name, { lower: true });
  return await CategoryRepo.createCategory({ name: data.name, slug });
};

const getAll = async () => await CategoryRepo.getAllCategories();
const update = async (id, data) => await CategoryRepo.updateCategory(id, data);
const remove = async (id) => await CategoryRepo.deleteCategory(id);

module.exports = { create, getAll, update, remove };

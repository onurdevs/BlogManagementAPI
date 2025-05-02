const CategoryService = require("../services/categoryService");

const create = async (req, res) => {
  try {
    const category = await CategoryService.create(req.body);
    res.status(201).json(category);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getAll = async (req, res) => {
  const categories = await CategoryService.getAll();
  res.json(categories);
};

const update = async (req, res) => {
  const updated = await CategoryService.update(req.params.id, req.body);
  res.json(updated);
};

const remove = async (req, res) => {
  await CategoryService.remove(req.params.id);
  res.status(204).end();
};

module.exports = { create, getAll, update, remove };

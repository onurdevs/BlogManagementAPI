const PostService = require("../services/postService");

const create = async (req, res) => {
  try {
    const post = await PostService.create(req.body, req.user.id);
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getAll = async (req, res) => {
  const posts = await PostService.getAll();
  res.json(posts);
};

const getOne = async (req, res) => {
  const post = await PostService.getOne(req.params.id);
  res.json(post);
};

const update = async (req, res) => {
  const updated = await PostService.update(req.params.id, req.body);
  res.json(updated);
};

const remove = async (req, res) => {
  await PostService.remove(req.params.id);
  res.status(204).end();
};

module.exports = { create, getAll, getOne, update, remove };

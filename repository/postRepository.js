const Post = require("../models/Post");

const createPost = async (data) => await Post.create(data);
const getAllPosts = async () => await Post.find().populate("author", "username").populate("category", "name");
// Do not expose sensitive user fields when populating author
const getPostById = async (id) =>
  await Post.findById(id)
    .populate("author", "username")
    .populate("category", "name");
const updatePost = async (id, data) => await Post.findByIdAndUpdate(id, data, { new: true });
const deletePost = async (id) => await Post.findByIdAndDelete(id);

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
};

const PostRepo = require("../repository/postRepository");

const create = async (data, userId) => {
  return await PostRepo.createPost({ ...data, author: userId });
};

const getAll = async () => await PostRepo.getAllPosts();
const getOne = async (id) => await PostRepo.getPostById(id);
const update = async (id, data) => await PostRepo.updatePost(id, data);
const remove = async (id) => await PostRepo.deletePost(id);

module.exports = { create, getAll, getOne, update, remove };

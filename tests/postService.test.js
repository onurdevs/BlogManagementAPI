require("dotenv").config();
const PostService = require("../services/postService");
const PostRepository = require("../repository/postRepository");

jest.mock("../repository/postRepository");

describe("PostService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("create() yeni gönderi oluşturmalı", async () => {
    const fakePost = {
      title: "Test Başlık",
      content: "Test içerik",
      category: "cat123",
    };
    const userId = "user123";

    PostRepository.createPost.mockImplementation((data) => ({
      _id: "post123",
      ...data,
    }));

    const result = await PostService.create(fakePost, userId);

    expect(result).toHaveProperty("title", "Test Başlık");
    expect(result).toHaveProperty("author", userId);
    expect(PostRepository.createPost).toHaveBeenCalledWith({
      ...fakePost,
      author: userId,
    });
  });

  it("getAll() tüm gönderileri getirmeli", async () => {
    const dummyPosts = [
      { title: "Post 1" },
      { title: "Post 2" },
    ];
    PostRepository.getAllPosts.mockResolvedValue(dummyPosts);

    const result = await PostService.getAll();

    expect(result).toHaveLength(2);
    expect(PostRepository.getAllPosts).toHaveBeenCalled();
  });

  it("getOne() ID ile gönderi getirmeli", async () => {
    const postId = "post123";
    PostRepository.getPostById.mockResolvedValue({
      _id: postId,
      title: "Test Post",
    });

    const result = await PostService.getOne(postId);

    expect(result).toHaveProperty("title", "Test Post");
    expect(PostRepository.getPostById).toHaveBeenCalledWith(postId);
  });

  it("update() gönderiyi güncellemeli", async () => {
    const postId = "post123";
    const newData = { title: "Güncel Başlık" };

    PostRepository.updatePost.mockResolvedValue({
      _id: postId,
      ...newData,
    });

    const result = await PostService.update(postId, newData);

    expect(result).toHaveProperty("title", "Güncel Başlık");
    expect(PostRepository.updatePost).toHaveBeenCalledWith(postId, newData);
  });

  it("remove() gönderiyi silmeli", async () => {
    const postId = "post123";
    PostRepository.deletePost.mockResolvedValue({ deleted: true });

    await PostService.remove(postId);

    expect(PostRepository.deletePost).toHaveBeenCalledWith(postId);
  });
});

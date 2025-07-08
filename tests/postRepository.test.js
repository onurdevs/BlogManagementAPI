const Post = require("../models/Post");
const PostRepository = require("../repository/postRepository");

jest.mock("../models/Post");

describe("postRepository.getPostById", () => {
  it("populates author username and category name", async () => {
    const resultData = { title: "sample" };
    const populateCategory = jest.fn().mockResolvedValue(resultData);
    const populateAuthor = jest.fn(() => ({ populate: populateCategory }));
    Post.findById.mockReturnValue({ populate: populateAuthor });

    const result = await PostRepository.getPostById("123");

    expect(Post.findById).toHaveBeenCalledWith("123");
    expect(populateAuthor).toHaveBeenCalledWith("author", "username");
    expect(populateCategory).toHaveBeenCalledWith("category", "name");
    expect(result).toBe(resultData);
  });
});

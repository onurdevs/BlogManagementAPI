require("dotenv").config();
const CategoryService = require("../services/categoryService");
const CategoryRepository = require("../repository/categoryRepository");

jest.mock("../repository/categoryRepository");

describe("CategoryService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("create() slug üreterek kategori oluşturmalı", async () => {
    const input = { name: "Yazılım" };

    CategoryRepository.createCategory.mockImplementation((data) => ({
      _id: "cat123",
      name: data.name,
      slug: data.slug,
    }));

    const result = await CategoryService.create(input);

    expect(result).toHaveProperty("name", "Yazılım");
    expect(result).toHaveProperty("slug", "yazilim");
    expect(CategoryRepository.createCategory).toHaveBeenCalledWith({
      name: "Yazılım",
      slug: "yazilim",
    });
  });

  it("getAll() tüm kategorileri getirmeli", async () => {
    CategoryRepository.getAllCategories.mockResolvedValue([
      { name: "Yazılım", slug: "yazilim" },
      { name: "Tasarım", slug: "tasarim" },
    ]);

    const result = await CategoryService.getAll();

    expect(result).toHaveLength(2);
    expect(CategoryRepository.getAllCategories).toHaveBeenCalled();
  });

  it("update() ile kategori güncellenmeli", async () => {
    const id = "cat123";
    const data = { name: "Yeni İsim" };

    CategoryRepository.updateCategory.mockResolvedValue({
      _id: id,
      name: "Yeni İsim",
    });

    const result = await CategoryService.update(id, data);

    expect(result).toHaveProperty("name", "Yeni İsim");
    expect(CategoryRepository.updateCategory).toHaveBeenCalledWith(id, data);
  });

  it("remove() ile kategori silinebilmeli", async () => {
    const id = "cat123";

    CategoryRepository.deleteCategory.mockResolvedValue({ deleted: true });

    await CategoryService.remove(id);

    expect(CategoryRepository.deleteCategory).toHaveBeenCalledWith(id);
  });
});

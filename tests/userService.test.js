require("dotenv").config(); // env değişkenlerini yükle
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserService = require("../services/userService");
const UserRepository = require("../repository/userRepository");

// MOCK: UserRepository fonksiyonlarını taklit et
jest.mock("../repository/userRepository");

describe("UserService.register", () => {
  it("yeni kullanıcı oluşturmalı", async () => {
    const userData = {
      username: "testuser",
      email: "test@example.com",
      password: "12345678",
    };

    // Email bulunmasın (yeni kullanıcı)
    UserRepository.findByEmail.mockResolvedValue(null);

    // createUser dönüşü
    UserRepository.createUser.mockImplementation((data) => ({
      _id: "abc123",
      username: data.username,
      email: data.email,
    }));

    const result = await UserService.register(userData);

    expect(result).toHaveProperty("id", "abc123");
    expect(result).toHaveProperty("email", "test@example.com");
    expect(UserRepository.createUser).toHaveBeenCalledWith(
      expect.objectContaining({
        username: "testuser",
        email: "test@example.com",
      })
    );
  });

  it("aynı email varsa hata fırlatmalı", async () => {
    UserRepository.findByEmail.mockResolvedValue({ id: "mevcut" });

    await expect(
      UserService.register({
        username: "x",
        email: "test@example.com",
        password: "123",
      })
    ).rejects.toThrow("Bu email zaten kayıtlı.");
  });
});

describe("UserService.login", () => {
  it("doğru bilgilerle giriş yapılmalı ve token dönmeli", async () => {
    const plainPassword = "12345678";
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    const fakeUser = {
      _id: "abc123",
      username: "testuser",
      email: "test@example.com",
      password: hashedPassword,
    };

    UserRepository.findByEmail.mockResolvedValue(fakeUser);

    const result = await UserService.login({
      email: "test@example.com",
      password: plainPassword,
    });

    expect(result).toHaveProperty("token");
    expect(result.user).toMatchObject({
      id: "abc123",
      username: "testuser",
      email: "test@example.com",
    });

    // Token decode kontrolü (isteğe bağlı)
    const decoded = jwt.verify(result.token, process.env.JWT_SECRET);
    expect(decoded).toHaveProperty("id", "abc123");
  });

  it("email bulunmazsa hata vermeli", async () => {
    UserRepository.findByEmail.mockResolvedValue(null);

    await expect(
      UserService.login({
        email: "notfound@example.com",
        password: "any",
      })
    ).rejects.toThrow("Kullanıcı bulunamadı.");
  });

  it("parola yanlışsa hata vermeli", async () => {
    const hashedPassword = await bcrypt.hash("correctpassword", 10);
    UserRepository.findByEmail.mockResolvedValue({
      _id: "abc123",
      username: "x",
      email: "test@example.com",
      password: hashedPassword,
    });

    await expect(
      UserService.login({
        email: "test@example.com",
        password: "wrongpassword",
      })
    ).rejects.toThrow("Parola hatalı.");
  });
});

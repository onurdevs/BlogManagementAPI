const request = require("supertest");
const app = require("../app"); // app.js'teki Express uygulaması
const mongoose = require("mongoose");

// Test verisi
const testUser = {
  username: "testuser",
  email: "testuser@example.com",
  password: "12345678",
};

describe("POST /api/users/register", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
  });

  afterAll(async () => {
    await mongoose.connection.db.dropDatabase(); // test verisini sil
    await mongoose.disconnect();
  });

  it("yeni kullanıcı oluşturmalı", async () => {
    const res = await request(app).post("/api/users/register").send(testUser);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("email", testUser.email);
  });
});

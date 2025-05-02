require("dotenv").config();
const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");

describe(" Auth Flow – End to End", () => {
  const testUser = {
    username: "e2euser",
    email: "e2euser@example.com",
    password: "12345678",
  };

  let token;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
  });

  afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.disconnect();
  });

  it(" kullanıcı kayıt olmalı", async () => {
    const res = await request(app)
      .post("/api/users/register")
      .send(testUser);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("email", testUser.email);
  });

  it("kullanıcı giriş yapmalı ve token almalı", async () => {
    const res = await request(app)
      .post("/api/users/login")
      .send({
        email: testUser.email,
        password: testUser.password,
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
    token = res.body.token; // sonraki testte kullanacağız
  });

  it(" token ile korumalı route erişilmeli", async () => {
    const res = await request(app)
      .get("/api/users/profile")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("userId");
  });
});

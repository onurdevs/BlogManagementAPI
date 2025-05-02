require("dotenv").config();
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");

describe("authMiddleware", () => {
  const mockReq = () => ({ headers: {} });
  const mockRes = () => {
    const res = {};
    res.status = jest.fn(() => res);
    res.json = jest.fn(() => res);
    return res;
  };
  const next = jest.fn();

  it("token yoksa 401 dönmeli", () => {
    const req = mockReq();
    const res = mockRes();

    authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: "Yetkisiz erişim. Token eksik.",
    });
  });

  it("token geçerliyse next() çağrılmalı", () => {
    const req = mockReq();
    const res = mockRes();
    const payload = { id: "user123" };

    const token = jwt.sign(payload, process.env.JWT_SECRET);
    req.headers.authorization = `Bearer ${token}`;

    authMiddleware(req, res, next);

    expect(req.user).toHaveProperty("id", "user123");
    expect(next).toHaveBeenCalled();
  });

  it("token geçersizse 403 dönmeli", () => {
    const req = mockReq();
    const res = mockRes();
    req.headers.authorization = "Bearer invalid.token.value";

    authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
      message: "Geçersiz veya süresi dolmuş token.",
    });
  });
});

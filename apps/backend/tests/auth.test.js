const request = require("supertest");
const app = require("../app");

describe("Auth routes", () => {
  it("should register a new user", async () => {
    const res = await request(app).post("/api/auth/register").send({
      email: `test${Date.now()}@example.com`,
      password: "password123",
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("User registered successfully");
  });

  it("should not login with wrong credentials", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "wrong@example.com",
      password: "wrongpassword",
    });
    expect(res.statusCode).toBe(401);
  });
});

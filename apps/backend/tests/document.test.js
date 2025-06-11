// Setup a test user and login before running protected route tests
let token = "";

beforeAll(async () => {
  const email = `test${Date.now()}@mail.com`;

  await request(app).post("/api/auth/register").send({
    email,
    password: "testpass123",
  });

  const res = await request(app).post("/api/auth/login").send({
    email,
    password: "testpass123",
  });

  token = res.body.token;
});

test("should create a new document", async () => {
  const res = await request(app)
    .post("/api/documents")
    .set("Authorization", `Bearer ${token}`)
    .send({
      title: "Test Document",
      description: "This is a test document",
      tags: ["test", "sample"],
    });

  expect(res.statusCode).toBe(201);
  expect(res.body.document.title).toBe("Test Document");
});

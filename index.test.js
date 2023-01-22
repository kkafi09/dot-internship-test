const request = require("supertest");
const app = require("./index");
const jwt = require("jsonwebtoken");
const User = require("./models/user");
const Contact = require("./models/contactModel");

describe("Authentication api", () => {
  beforeEach(async () => {
    // Create a test user and save it to the database
    const user = await request(app)
      .post("/api/auth/register")
      .send({ name: "Kafi", username: "kkafi09", password: "rahasia" });
  });

  it("/login -> should return valid token on login", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({ username: "kkafi09", password: "rahasia" });
    const decoded = jwt.verify(response.body.token, process.env.JWT_SECRET);
    expect(decoded.iat).toEqual(Math.floor(Date.now() / 1000));
  });

  afterEach(async () => {
    // Clear the test user from the database
    await User.deleteMany({});
  });
});

describe("Contact App API", () => {
  let token = null;
  beforeEach(async () => {
    // Create a test user and save it to the database
    const user = await request(app)
      .post("/api/auth/register")
      .send({ name: "Kafi", username: "kkafi09", password: "rahasia" });
  });

  it("GET /contacts --> array contacts", async () => {
    const response = await request(app).get("/api/contacts");

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("GET /contacts/id --> specific contacts by Id", async () => {
    const response = await request(app).get(
      "/api/contacts/5e63c3a5e4232e4cd0274ac2"
    );

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("GET /contacts/id --> 404 if not found link", () => {
    return request(app).get("/api/contacs/99999").expect(404);
  });

  it("POST /contacts --> create contact", async () => {
    const loginResponse = await request(app)
      .post("/api/auth/login")
      .send({ username: "kkafi09", password: "rahasia" });
    token = loginResponse.body.token;

    const response = await request(app)
      .post("/api/contacts")
      .send({
        name: "Kafi",
        email: "kafi@gmail.com",
        phone_number: "085213512623",
      })
      .set("Authorization", token);

    expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
  });

  afterEach(async () => {
    // Clear the test user from the database
    await User.deleteMany({});
    // Clear Contact from the database
    await Contact.deleteMany({});
  });
});

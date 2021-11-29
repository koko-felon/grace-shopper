const request = require("supertest")
const app = require("../app")

describe("apiRouter", () => {
  it("should respond to /api with a 200", async () => {
    const response = await request(app).get("/api")
    expect(response.statusCode).toBe(200)
  })
})

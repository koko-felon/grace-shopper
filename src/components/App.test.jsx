import { render, screen } from "@testing-library/react"
import App from "./App"
import { rest } from "msw"
import { setupServer } from "msw/node"

// This sets up a mock testing server
const server = setupServer(
  // This is a mock request to /api
  rest.get("/api", (req, res, ctx) => {
    return res(ctx.json({ message: "Test Message" }))
  })
)

// These make the mock server listen and finish properly
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

// This is an example of how to test a component
describe("<App/>", () => {
  // ! You should probably remove this if you change <App/>
  it("renders the API under construction message", async () => {
    // render the component
    render(<App />)
    // Wait for the message to appear
    const message = await screen.findByText("Test Message");
    // Assert it is correct
    expect(message).toBeInTheDocument()
  });
});

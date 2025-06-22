import axios from "axios";
import SignService from "./SignService";

jest.mock("axios", () => ({
  __esModule: true,
  default: {
    post: jest.fn(),
  },
}));

describe("SignService", () => {
  beforeEach(() => {
    process.env.REACT_APP_API_URL = "http://api.com";
    axios.post.mockReset();
  });

  it("login funciona correctamente", async () => {
    axios.post.mockResolvedValue({
      data: { token: "123456" },
    });

    const result = await SignService.login("test@gmail.com", "123456");
    expect(result.data.token).toBe("123456");
  });
});

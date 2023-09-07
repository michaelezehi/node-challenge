const handleRequest = require("./models/ServerLogic");

describe("Server Logic", () => {
  let mockHandler;

  beforeEach(() => {
    mockHandler = {
      reply: jest.fn(),
    };
  });

  test("should handle request and reply with success message", async () => {
    const payload = { type: "buy", price: 100, quantity: 1 };

    try {
      const result = await handleRequest(payload);
      mockHandler.reply(null, result);
    } catch (error) {
      mockHandler.reply(error, null);
    }

    expect(mockHandler.reply).toHaveBeenCalledWith(null, {
      msg: "Order added and matched if possible",
    });
  });

  test("should handle request and reply with error", async () => {
    const payload = { type: "invalid", price: 100, quantity: 1 };

    try {
      const result = await handleRequest(payload);
      mockHandler.reply(null, result);
    } catch (error) {
      mockHandler.reply(error, null);
    }

    expect(mockHandler.reply).toHaveBeenCalledWith(
      new Error("Invalid order type"),
      null
    );
  });
});

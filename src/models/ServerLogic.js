const OrderEngine = require("./OrderEngine");

const orderEngine = new OrderEngine();

const validatePayload = (payload) => {
  if (!["buy", "sell"].includes(payload.type)) {
    throw new Error("Invalid order type");
  }
};

const handleRequest = async (payload) => {
  validatePayload(payload);
  try {
    await orderEngine.addOrder(payload);
    return { msg: "Order added and matched if possible" };
  } catch (error) {
    console.error("Error in server logic:", error);
    throw error;
  }
};

module.exports = handleRequest;

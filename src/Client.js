const { PeerRPCClient } = require("grenache-nodejs-http");
const Link = require("grenache-nodejs-link");

const sharedVariables = require("./shared/constants");

const link = new Link({
  grape: "http://127.0.0.1:30001",
});
link.start();

const peer = new PeerRPCClient(link, {});
peer.init();

const order = {
  type: "buy", // or "sell"
  price: 100,
  quantity: 1,
};

peer.request(
  sharedVariables.eventServiceName,
  order,
  { timeout: 10000 },
  (err, data) => {
    if (err) {
      console.error("Error in client:", err);
      process.exit(-1);
    }
    console.log(data); // { msg: 'Order added and matched if possible' }
  }
);

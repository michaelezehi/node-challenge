const { PeerRPCServer } = require("grenache-nodejs-http");
const Link = require("grenache-nodejs-link");

const handleRequest = require("./models/ServerLogic");
const sharedVariables = require("./shared/constants");

const link = new Link({
  grape: "http://127.0.0.1:30001",
});
link.start();

const peer = new PeerRPCServer(link, {
  timeout: 300000,
});
peer.init();

const port = 1024 + Math.floor(Math.random() * 1000);
const service = peer.transport("server");
service.listen(port);

setInterval(function () {
  link.announce(sharedVariables.eventServiceName, service.port, {});
}, 1000);

service.on("request", async (_rid, _key, payload, handler) => {
  try {
    const res = await handleRequest(payload);
    console.log(res.msg);
    handler.reply(null, res);
  } catch (error) {
    console.error("Error in server:", error);
    handler.reply(error, null);
  }
});

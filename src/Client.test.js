const { PeerRPCClient } = require("grenache-nodejs-http");
const Link = require("grenache-nodejs-link");

jest.mock("grenache-nodejs-http");
jest.mock("grenache-nodejs-link");

describe("Client", () => {
  beforeEach(() => {
    PeerRPCClient.prototype.init = jest.fn();
    Link.prototype.start = jest.fn();
  });

  it.each([
    { type: "buy", price: 100, quantity: 1 },
    { type: "sell", price: 100, quantity: 1 },
  ])(
    "should handle sample orders correctly with data: %s",
    (sampleOrder, done) => {
      PeerRPCClient.prototype.request = jest.fn(
        (_service, _payload, _options, callback) => {
          callback(null, { msg: "Order added and matched if possible" });
        }
      );

      const peer = new PeerRPCClient(
        new Link({ grape: "http://127.0.0.1:30001" }),
        {}
      );
      peer.init();

      peer.request(
        "rpc_server",
        sampleOrder,
        { timeout: 10000 },
        (err, data) => {
          expect(err).toBeNull();
          expect(data).toEqual({ msg: "Order added and matched if possible" });
          done();
        }
      );
    }
  );

  test("should handle errors", (done) => {
    PeerRPCClient.prototype.request = jest.fn(
      (service, payload, options, callback) => {
        callback(new Error("An error occurred"), null);
      }
    );

    const peer = new PeerRPCClient(
      new Link({ grape: "http://127.0.0.1:30001" }),
      {}
    );
    peer.init();

    peer.request(
      "rpc_server",
      { type: "buy", price: 100, quantity: 1 },
      { timeout: 10000 },
      (err, data) => {
        expect(err).toEqual(new Error("An error occurred"));
        expect(data).toBeNull();
        done();
      }
    );
  });
});

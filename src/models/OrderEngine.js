class OrderEngine {
  constructor() {
    this.buyOrders = [];
    this.sellOrders = [];
    this.mutex = false; // Mutex to handle race conditions
  }

  lock() {
    while (this.mutex) {
      this.mutex = false;
    }
    this.mutex = true;
  }

  unlock() {
    this.mutex = false;
  }

  addOrder(order) {
    if (!["buy", "sell"].includes(order.type)) {
      throw new Error("Invalid order type");
    }

    if (typeof order.price !== "number") {
      throw new Error("Invalid price type");
    }

    try {
      this.lock();
      if (order.type === "buy") {
        this.buyOrders.push(order);
        this.buyOrders.sort((a, b) => b.price - a.price);
      } else {
        this.sellOrders.push(order);
        this.sellOrders.sort((a, b) => a.price - b.price);
      }
      this.unlock();
      this.matchOrders();
    } catch (error) {
      console.error("Error in addOrder:", error);
      this.unlock();
      throw error;
    }
  }

  matchOrders() {
    this.lock();
    while (this.buyOrders.length > 0 && this.sellOrders.length > 0) {
      const topBuy = this.buyOrders[0];
      const topSell = this.sellOrders[0];
      if (topBuy.price >= topSell.price) {
        console.log(
          `Matched: Buy @ ${topBuy.price} with Sell @ ${topSell.price}`
        );
        this.buyOrders.shift();
        this.sellOrders.shift();
      } else {
        break;
      }
    }
    this.unlock();
  }
}

module.exports = OrderEngine;

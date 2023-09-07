const OrderEngine = require('./OrderEngine');

test('should add a buy order and match', () => {
  const orderEngine = new OrderEngine();
  const buyOrder = { type: 'buy', price: 100, quantity: 1 };
  const sellOrder = { type: 'sell', price: 90, quantity: 1 };
  orderEngine.addOrder(buyOrder);
  orderEngine.addOrder(sellOrder);
  expect(orderEngine.buyOrders.length).toBe(0);
  expect(orderEngine.sellOrders.length).toBe(0);
});

test('should add a sell order and not match', () => {
  const orderEngine = new OrderEngine();
  const buyOrder = { type: 'buy', price: 80, quantity: 1 };
  const sellOrder = { type: 'sell', price: 90, quantity: 1 };
  orderEngine.addOrder(buyOrder);
  orderEngine.addOrder(sellOrder);
  expect(orderEngine.buyOrders.length).toBe(1);
  expect(orderEngine.sellOrders.length).toBe(1);
});

test('should throw error for invalid order type', () => {
  const orderEngine = new OrderEngine();
  const invalidOrder = { type: 'invalid', price: 100, quantity: 1 };
  expect(() => orderEngine.addOrder(invalidOrder)).toThrow('Invalid order type');
});

test('should handle error in addOrder', () => {
  const orderEngine = new OrderEngine();
  const invalidOrder = { type: 'buy', price: 'invalid', quantity: 1 };
  expect(() => orderEngine.addOrder(invalidOrder)).toThrow();
});

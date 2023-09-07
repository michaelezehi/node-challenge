const handleRequest = require('./ServerLogic');

describe('Server Logic', () => {
  test('should add an order', async () => {
    const order = { type: 'buy', price: 100, quantity: 1 };
    const res = await handleRequest(order);
    expect(res).toHaveProperty('msg', 'Order added and matched if possible');
  });

  test('should throw an error for invalid order type', async () => {
    const invalidOrder = { type: 'invalid', price: 100, quantity: 1 };
    await expect(handleRequest(invalidOrder)).rejects.toThrow('Invalid order type');
  });
});

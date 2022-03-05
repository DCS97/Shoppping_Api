import { Order, OrderStore } from '../orders';
import { ProductStore } from '../products';
import { UserStore } from '../users';

const order = new OrderStore();

describe('Order Model', () => {
  it('should have a method to index the current order by user', () => {
    expect(order.getCurrentOrderByUserId).toBeDefined();
  });
  it('should have a method to index active orders by user', () => {
    expect(order.getActiveOrdersByUserId).toBeDefined();
  });
  it('should have a method to index completed orders by user', () => {
    expect(order.getCompletedOrdersByUserId).toBeDefined();
  });

  describe('Manipulate Order methods', () => {
    const user = new UserStore();
    const product = new ProductStore();

    beforeAll(async () => {
      await user.createUser({
        firstName: 'user',
        lastName: 'shoppingUser',
        password: 'user123#',
      });
      await product.createProduct({
        name: 'iPhone',
        price: '645',
        category: 'phone',
      });
    });

    it('should return current order of user using getCurrentOrderByUserId method', async () => {
      const result: Order = await order.getCurrentOrderByUserId(1);
      expect(result).toEqual({
        id: '1',
        product_id: '1',
        quantity: 10,
        user_id: 1,
        status: 'active',
      });
    });
    it('should return active orders of user using getActiveOrdersByUserId method', async () => {
      const result: Order[] = await order.getActiveOrdersByUserId('1');
      expect(result).toEqual([
        {
          id: '1',
          product_id: '1',
          quantity: 10,
          user_id: 1,
          status: 'active',
        },
      ]);
    });
    it('should return completed orders of user using getCompletedOrdersByUserId method', async () => {
      const result: Order[] = await order.getCompletedOrdersByUserId('1');
      expect(result).toEqual([]);
    });
  });
});

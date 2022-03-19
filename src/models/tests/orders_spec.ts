import { Order, OrderStatus, OrderStore } from '../orders';
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
  it('should have a method to index create an order', () => {
    expect(order.create).toBeDefined();
  });

  describe('Manipulate Order methods', () => {
    const user = new UserStore();
    const product = new ProductStore();
    var newOrder: Order;

    beforeAll(async () => {
      await user.createUser(
        {
          firstName: 'user',
          lastName: 'shopping',
          userLogin: 'shoppingUser',
          password: 'user123#',
        },
        1
      );

      await product.createProduct(
        {
          name: 'iPhone',
          price: 645,
          category: 'phone',
        },
        1
      );

      newOrder = {
        id: 1,
        products: [
          {
            product_id: 1,
            quantity: 5,
          },
        ],
        user_id: 1,
        status: OrderStatus.ACTIVE,
      };
    });

    it('should return current order of user using getCurrentOrderByUserId method', async () => {
      const result: Order = await order.getCurrentOrderByUserId(1);
      expect(result).toEqual(newOrder);
    });
    it('should return active orders of user using getActiveOrdersByUserId method', async () => {
      const result: Order[] = await order.getActiveOrdersByUserId(1);
      expect(result).toEqual([newOrder]);
    });
    it('should return completed orders of user using getCompletedOrdersByUserId method', async () => {
      const result: Order[] = await order.getCompletedOrdersByUserId(1);
      expect(result).toEqual([]);
    });
    it('add method should add a order', async () => {
      const createdOrder: Order = await order.create(
        {
          products: [
            {
              product_id: 1,
              quantity: 5,
            },
          ],
          user_id: 1,
          status: OrderStatus.ACTIVE,
        },
        1
      );

      expect(createdOrder).toEqual(newOrder);
    });
  });
});

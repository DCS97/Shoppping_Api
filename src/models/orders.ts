import client from '../database';
//('active', 'complete')
export enum OrderStatus {
  ACTIVE = 'active',
  COMPLETE = 'complete',
}
export interface OrderProduct {
  product_id: number;
  quantity: number;
}
export interface OrderData {
  products: OrderProduct[];
  user_id: number;
  status: OrderStatus;
}

export interface Order extends OrderData {
  id: number;
}

export class OrderStore {
  // Get current order by user id
  async getCurrentOrderByUserId(userId: number): Promise<Order> {
    try {
      const connection = await client.connect();
      const sql = `SELECT * FROM orders WHERE user_id = ${userId} ORDER BY id DESC LIMIT 1`;
      const result = await connection.query(sql);
      connection.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not get current order. Error: ${err}`);
    }
  }

  // Get active order by user id
  async getActiveOrdersByUserId(userId: number): Promise<Order[]> {
    try {
      const status = 'active';
      const connection = await client.connect();
      const sql = `SELECT * FROM orders WHERE user_id = ${userId} AND status = $1`;
      const result = await connection.query(sql, [status]);
      connection.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get active order. Error: ${err}`);
    }
  }

  // select completed order by user id
  async getCompletedOrdersByUserId(userId: number): Promise<Order[]> {
    try {
      const status = 'complete';
      const connection = await client.connect();
      const sql = `SELECT * FROM orders WHERE user_id = ${userId} AND status = $1`;
      const result = await connection.query(sql, [status]);
      connection.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get completed orders. Error: ${err}`);
    }
  }

  async create(order: OrderData, id?: number): Promise<Order> {
    const { products, status, user_id } = order;
    const order_id = id ? id : Math.floor(Math.random() * 100);

    try {
      const sql =
        'INSERT INTO orders (id, user_id, status) VALUES($1, $2, $3) RETURNING *';
      const connection = await client.connect();
      const result = await connection.query(sql, [order_id, user_id, status]);
      const createdOrder = result.rows[0];

      const orderProductsSql =
        'INSERT INTO order_products (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING product_id, quantity';

      const orderProducts: any[] = [];

      products.forEach(async (product) => {
        const { product_id, quantity } = product;

        const { rows } = await connection.query(orderProductsSql, [
          order_id,
          product_id,
          quantity,
        ]);

        orderProducts.push(rows[0]);
      });

      connection.release();

      return {
        ...createdOrder,
        products: orderProducts,
      };
    } catch (err) {
      throw new Error(`Could not add new order for user ${user_id}. ${err}`);
    }
  }
}

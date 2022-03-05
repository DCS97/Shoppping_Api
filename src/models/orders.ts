import client from '../database';

export interface Order {
  id: string;
  product_id: string;
  quantity: number;
  user_id: number;
  status: string;
}

export class OrderStore {
  // Get current order by user id
  async getCurrentOrderByUserId(userId: string): Promise<Order> {
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
  async getActiveOrdersByUserId(userId: string): Promise<Order[]> {
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
  async getCompletedOrdersByUserId(userId: string): Promise<Order[]> {
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
}

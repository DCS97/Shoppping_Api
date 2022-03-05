import client from '../database';

export interface Product {
  id: string;
  name: string;
  price: string;
  category: string;
}
export interface ProductData {
  name: string;
  price: string;
  category: string;
}

export class ProductStore {
  // select all products
  async index(): Promise<Product[]> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * FROM products`;
      const result = await conn.query(sql);
      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get all products. Error: ${err}`);
    }
  }

  // select product by id
  async show(productId: string): Promise<Product> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * FROM products WHERE id=$1`;
      const result = await conn.query(sql, [productId]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not get product by id. Error: ${err}`);
    }
  }

  // select product by category
  async getProductByCategory(category: string): Promise<Product[]> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * FROM products WHERE category=$1`;
      const result = await conn.query(sql, [category]);
      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get product by category. Error: ${err}`);
    }
  }

  // create product
  async createProduct(product: ProductData): Promise<Product> {
    try {
      const { name, price, category } = product;
      const sql = `INSERT INTO products (name, price, category) VALUES($1, $2, $3) RETURNING *`;
      const conn = await client.connect();
      const result = await conn.query(sql, [name, price, category]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not create product. Error: ${err}`);
    }
  }
}

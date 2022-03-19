import client from '../database';

export interface ProductData {
  name: string;
  price: number;
  category: string;
}

export interface Product extends ProductData {
  id: number;
}

export class ProductStore {
  // select all products
  async index(): Promise<Product[]> {
    try {
      const connection = await client.connect();
      const sql = `SELECT * FROM products`;
      const result = await connection.query(sql);
      connection.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get products. Error: ${err}`);
    }
  }

  // select product by id
  async show(productId: number): Promise<Product> {
    try {
      const connection = await client.connect();
      const sql = `SELECT * FROM products WHERE id=$1`;
      const result = await connection.query(sql, [productId]);
      connection.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not get product by id. Error: ${err}`);
    }
  }

  // select product by category
  async getProductByCategory(category: string): Promise<Product[]> {
    try {
      const connection = await client.connect();
      const sql = `SELECT * FROM products WHERE category=$1`;
      const result = await connection.query(sql, [category]);
      connection.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get product by category. Error: ${err}`);
    }
  }

  // create product
  async createProduct(product: ProductData, id?: number): Promise<Product> {
    const { name, price, category } = product;
    const product_id = id ? id : Math.floor(Math.random() * 100);
    
    try {
      const sql = `INSERT INTO products (id, name, price, category) VALUES($1, $2, $3, $4) RETURNING *`;
      const connection = await client.connect();
      const result = await connection.query(sql, [
        product_id,
        name,
        price,
        category,
      ]);
      connection.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not create product. Error: ${err}`);
    }
  }
}

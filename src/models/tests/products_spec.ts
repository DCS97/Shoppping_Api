import { Product, ProductStore } from '../products';

const product = new ProductStore();

describe('Product Model', () => {
  it('should have a method to create product', () => {
    expect(product.createProduct).toBeDefined();
  });
  it('should have a method to return product by category', () => {
    expect(product.getProductByCategory).toBeDefined();
  });
  it('should have a show product by id method', () => {
    expect(product.show).toBeDefined();
  });
  it('should have an index method', () => {
    expect(product.index).toBeDefined();
  });

  it('should create a product using createProduct method', async () => {
    const result: Product = await product.createProduct({
      name: 'iPhone',
      price: 645,
      category: 'phone',
    });
    expect(result).toEqual({
      id: 1,
      name: 'iPhone',
      price: 645,
      category: 'phone',
    });
  });
  it('should return an index of products', async () => {
    const result: Product[] = await product.index();
    expect(result).toEqual([
      {
        id: 1,
        name: 'iPhone',
        price: 645,
        category: 'phone',
      },
    ]);
  });

  it('should return the correct product using show', async () => {
    const result: Product = await product.show(1);
    expect(result).toEqual({
      id: 1,
      name: 'iPhone',
      price: 645,
      category: 'phone',
    });
  });
  it('should return the correct product using getProductByCat', async () => {
    const result: Product[] = await product.getProductByCategory('phone');
    expect(result).toEqual([
      {
        id: 1,
        name: 'iPhone',
        price: 645,
        category: 'phone',
      },
    ]);
  });
});

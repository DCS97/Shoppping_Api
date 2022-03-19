import supertest from 'supertest';
import { ProductData } from '../../models/products';
import app from '../../server';

const request = supertest(app);
describe('Product Handler', () => {
  const productData: ProductData = {
    name: 'nintendo',
    price: 199,
    category: 'console',
  };
  let token: string, user_id: number, product_id: number;

  it('gets the create endpoint', (done) => {
    request
      .post('/products/create')
      .send(productData)
      .set('Authorization', 'bearer ' + token)
      .then((res) => {
        expect(res.status).toBe(200);

        done();
      });
  });

  it('gets the index endpoint', (done) => {
    request.get('/products').then((res) => {
      expect(res.status).toBe(200);
      done();
    });
  });

  it('gets the show endpoint', (done) => {
    request.get(`/products/${product_id}`).then((res) => {
      expect(res.status).toBe(200);
      done();
    });
  });
});

import supertest from 'supertest';
import jwt, { Secret } from 'jsonwebtoken';

import app from '../../server';
import { OrderData, OrderStatus } from '../../models/orders';
import { UserData } from '../../models/users';
import { ProductData } from '../../models/products';

const request = supertest(app);
const SECRET = process.env.JWT_SECRET as Secret;

describe('Order Router', () => {
  let token: string,
    order: OrderData,
    user_id: number,
    product_id: number,
    order_id: number;

  beforeAll(async () => {
    const userData: UserData = {
      userLogin: 'orderTester',
      firstName: 'Order',
      lastName: 'Tester',
      password: 'password123',
    };
    const productData: ProductData = {
      name: 'nintendo',
      price: 199,
      category: 'console',
    };

    const { body: userBody } = await request
      .post('/users/create')
      .send(userData);

    token = userBody;

    // @ts-ignore
    const { user } = jwt.verify(token, SECRET);
    user_id = user.id;

    const { body: productBody } = await request
      .post('/products/create')
      .set('Authorization', 'bearer ' + token)
      .send(productData);
    product_id = productBody.id;

    order = {
      products: [
        {
          product_id,
          quantity: 5,
        },
      ],
      user_id,
      status: OrderStatus.ACTIVE,
    };
  });

  it('gets the create endpoint', (done) => {
    request
      .post('/orders/create')
      .send(order)
      .set('Authorization', 'bearer ' + token)
      .then((res) => {
        const { body, status } = res;

        expect(status).toBe(200);

        order_id = body.id;

        done();
      });
  });

  it('gets the index endpoint', (done) => {
    request
      .get('/orders')
      .set('Authorization', 'bearer ' + token)
      .then((res) => {
        expect(res.status).toBe(200);
        done();
      });
  });

  it('gets the show endpoint', (done) => {
    request
      .get(`/orders/${order_id}`)
      .set('Authorization', 'bearer ' + token)
      .then((res) => {
        expect(res.status).toBe(200);
        done();
      });
  });
});

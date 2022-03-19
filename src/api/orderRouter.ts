import { Application, Request, Response } from 'express';
import { Order, OrderProduct, OrderStatus, OrderStore } from '../models/orders';
import { authenticator } from '../utils/authenticator';

const OrderStoreInstance = new OrderStore();

const getActiveOrdersByUserId = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (id === undefined) {
      res.status(400);
      res.send('Missing required parameter :id.');
      return false;
    }

    if (typeof id !== 'number') {
      res.status(400);
      res.send('Wrong required parameter :id. id must be a number.');
      return false;
    }

    const orders: Order[] = await OrderStoreInstance.getActiveOrdersByUserId(
      id
    );

    res.json(orders);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
const getCurrentOrderByUserId = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (id === undefined) {
      res.status(400);
      res.send('Missing required parameter :id.');
      return false;
    }

    if (typeof id !== 'number') {
      res.status(400);
      res.send('Wrong required parameter :id. id must be a number.');
      return false;
    }

    const order: Order = await OrderStoreInstance.getCurrentOrderByUserId(id);

    res.json(order);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
const getCompletedOrdersByUserId = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (id === undefined) {
      res.status(400);
      res.send('Missing required parameter :id.');
      return false;
    }

    if (typeof id !== 'number') {
      res.status(400);
      res.send('Wrong required parameter :id. id must be a number.');
      return false;
    }

    const orders: Order[] = await OrderStoreInstance.getCompletedOrdersByUserId(
      id
    );

    res.json(orders);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    let products = req.body.products as OrderProduct[];
    const status = req.body.status as OrderStatus;
    const user_id = Number(req.body.user_id);
    const id = Number(req.body.id);

    if (
      products === undefined ||
      status === undefined ||
      user_id === undefined
    ) {
      res.status(400);
      res.send(
        'Some required parameters are missing! eg. :products, :status, :user_id'
      );
      return false;
    }

    const order: Order = await OrderStoreInstance.create(
      {
        products,
        status,
        user_id,
      },
      id
    );

    res.json(order);
  } catch (e) {
    res.status(400);
    res.json(e);
  }
};

export default function orderRoutes(app: Application) {
  app.get('/orders/active/:id', authenticator, getActiveOrdersByUserId);
  app.get('/orders/completed/:id', authenticator, getCompletedOrdersByUserId);
  app.get('/orders/:id', authenticator, getCurrentOrderByUserId);
  app.post('/orders/create', authenticator, create);
}

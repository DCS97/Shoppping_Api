import { Application, Request, Response } from 'express';
import { Order, OrderStore } from '../models/orders';
import { authenticator } from '../utils/authenticator';

const OrderStoreInstance = new OrderStore();

const getActiveOrdersByUserId = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    if (id === undefined) {
      res.status(400);
      res.send('Missing required parameter :id.');
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
    const id = req.params.id;

    if (id === undefined) {
      res.status(400);
      res.send('Missing required parameter :id.');
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
    const id = req.params.id;

    if (id === undefined) {
      res.status(400);
      res.send('Missing required parameter :id.');
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

export default function orderRoutes(app: Application) {
  app.get('/orders/:id', authenticator, getActiveOrdersByUserId);
  app.get('/orders/:id', authenticator, getCompletedOrdersByUserId);
  app.get('/orders/:id', authenticator, getCurrentOrderByUserId);
}

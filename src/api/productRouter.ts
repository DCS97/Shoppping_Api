import { Application, Request, Response } from 'express';
import { Product, ProductStore } from '../models/products';
import { authenticator } from '../utils/authenticator';

const ProductStoreInstance = new ProductStore();

const index = async (req: Request, res: Response) => {
  try {
    const products: Product[] = await ProductStoreInstance.index();

    res.json(products);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const name = req.body.name;
    const category = req.body.category;
    const price = req.body.price;

    if (name === undefined || price === undefined || category === undefined) {
      res.status(400);
      res.send(
        'Some required parameters are missing! eg. :name, :price, :category'
      );
      return false;
    }

    const product: Product = await ProductStoreInstance.createProduct({
      name,
      price,
      category,
    });

    res.json(product);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    if (id === undefined) {
      res.status(400);
      res.send('Missing required parameter :id.');
      return false;
    }

    const product: Product = await ProductStoreInstance.show(id);

    res.json(product);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const getProductByCategory = async (req: Request, res: Response) => {
  try {
    const category = req.body.category;

    if (category === undefined) {
      res.status(400);
      res.send('Some required parameters are missing! eg. :category');
      return false;
    }

    const product: Product[] = await ProductStoreInstance.getProductByCategory(
      category
    );

    res.json(product);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

export default function productRoutes(app: Application) {
  app.get('/products', index);
  app.post('/products/create', authenticator, create);
  app.get('/products/:id', show);
  app.delete('/products/:category', getProductByCategory);
}

import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import { PORT, ADRESS } from './constants';
import userRoutes from './api/userRouter';
import productRoutes from './api/productRouter';
import orderRoutes from './api/orderRouter';

const app: Application = express();

const corsOptions = {
  optionsSuccessStatus: 200,
};

app.use(bodyParser.json());

app.listen(PORT, (): void => {
  console.log(`starting app on: ${ADRESS}`);
});

app.get('/', (req: Request, res: Response): void => {
  res.status(200).send('Server is working!');
});

userRoutes(app);
productRoutes(app);
orderRoutes(app);

export default app;

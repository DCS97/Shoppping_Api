import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { PORT, ADRESS } from './constants';

const app: Application = express();

const corsOptions = {
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.listen(PORT, (): void => {
  console.log(`starting app on: ${ADRESS}`);
});

app.get('/', (req: Request, res: Response): void => {
  res.status(200).send('Server is working!');
});

export default app;

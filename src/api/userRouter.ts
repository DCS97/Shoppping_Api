import { Application, Request, Response } from 'express';
import { User, UserStore } from '../models/users';
import { authenticator } from '../utils/authenticator';
import { userToken } from '../utils/userToken';

const UserStoreInstance = new UserStore();

const index = async (req: Request, res: Response) => {
  try {
    const users: User[] = await UserStoreInstance.index();

    res.json(users);
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

    const user: User = await UserStoreInstance.show(id);

    res.json(user);
  } catch (e) {
    res.status(400);
    res.json(e);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const password = req.body.password;

    if (
      firstName === undefined ||
      lastName === undefined ||
      password === undefined
    ) {
      res.status(400);
      res.send(
        'Some required parameters are missing! eg. :firstName, :lastName, :password'
      );
      return false;
    }

    const user: User = await UserStoreInstance.createUser({
      firstName,
      lastName,
      password,
    });

    res.json(userToken(user));
  } catch (e) {
    res.status(400);
    res.json(e);
  }
};
export default function userRoutes(app: Application) {
  app.get('/users', authenticator, index);
  app.post('/users/create', create);
  app.get('/users/:id', authenticator, show);
}

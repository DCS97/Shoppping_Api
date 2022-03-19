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
    const id = Number(req.params.id);

    if (id === undefined) {
      res.status(400);
      res.send('Missing required parameter :id.');
      return false;
    }

    const user: User = await UserStoreInstance.show(id);

    res.json(user);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const userLogin = req.body.userLogin;
    const password = req.body.password;
    const id = Number(req.body.id);

    if (
      firstName === undefined ||
      lastName === undefined ||
      password === undefined ||
      userLogin === undefined
    ) {
      res.status(400);
      res.send(
        'Some required parameters are missing! eg. :firstName, :lastName, :password. :userLogin'
      );
      return false;
    }

    const user: User = await UserStoreInstance.createUser(
      {
        firstName,
        lastName,
        userLogin,
        password,
      },
      id
    );

    res.json(userToken(user));
  } catch (e) {
    res.status(400);
    res.json(e);
  }
};

const authenticate = async (req: Request, res: Response) => {
  try {
    const userLogin = req.body.userLogin;
    const password = req.body.password;

    if (userLogin === undefined || password === undefined) {
      res.status(400);
      res.send(
        'Some required parameters are missing! eg. :userLogin, :password'
      );
      return false;
    }

    const user: User | null = await UserStoreInstance.authenticate(
      userLogin,
      password
    );

    if (user === null) {
      res.status(401);
      res.send(`Wrong password for user ${userLogin}.`);

      return false;
    }

    res.json(userToken(user));
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
export default function userRoutes(app: Application) {
  app.get('/users', authenticator, index);
  app.post('/users/create', create);
  app.get('/users/:id', authenticator, show);
  app.post('/users/auth', authenticate);
}

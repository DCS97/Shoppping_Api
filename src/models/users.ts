import bcrypt from 'bcrypt';
import client from '../database';

export interface UserData {
  firstName: string;
  lastName: string;
  userLogin: string;
  password: string;
}
export interface User extends UserData {
  id: number;
}

export class UserStore {
  // select all users
  async index(): Promise<User[]> {
    try {
      const connection = await client.connect();
      const sql = `SELECT * FROM users`;
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get users. ERROR: ${err}`);
    }
  }

  // select user by id
  async show(userId: number): Promise<User> {
    try {
      const connection = await client.connect();
      const sql = `SELECT * FROM users WHERE id = ($1)`;
      const result = await connection.query(sql, [userId]);
      connection.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not get user with the following id:${userId}. ERROR: ${err}`
      );
    }
  }

  // create a user
  async createUser(user: UserData, id?: number): Promise<User> {
    const { userLogin, firstName, lastName, password } = user;
    const user_id = id ? id : Math.floor(Math.random() * 100);
    try {
      const pepper: string = process.env.BCRYPT_PASSWORD as string;
      const salt: string = process.env.SALT_ROUNDS as string;

      const hashPassword: string = bcrypt.hashSync(
        password + pepper,
        parseInt(salt, 10)
      );

      const connection = await client.connect();
      const sql = `INSERT INTO users (id, userLogin, firstName, lastName, password) VALUES($1, $2, $3, $4, $5) RETURNING *`;
      const result = await connection.query(sql, [
        user_id,
        userLogin,
        firstName,
        lastName,
        hashPassword,
      ]);
      connection.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not create user. ERROR: ${err}`);
    }
  }

  async authenticate(
    userLogin: string,
    password: string
  ): Promise<User | null> {
    try {
      const sql = 'SELECT * FROM users WHERE id=($1)';
      const connection = await client.connect();
      const result = await connection.query(sql, [userLogin]);

      if (result.rows.length > 0) {
        const user = result.rows[0];

        if (
          bcrypt.compareSync(
            password + process.env.BCRYPT_PASSWORD,
            user.password
          )
        ) {
          return user;
        }
      }

      connection.release();

      return null;
    } catch (err) {
      throw new Error(`Could not find user ${userLogin}. ${err}`);
    }
  }
}

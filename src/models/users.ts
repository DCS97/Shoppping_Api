import bcrypt from 'bcrypt';
import client from '../database';
import database from '../database';
// import { generateToken } from '../../utils';


export interface User {
  id: string;
  firstName: string;
  lastName: string;
  password: string; 
}
export interface UserData {
  firstName: string;
  lastName: string;
  password: string;
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
      throw new Error(`Cannot get all users. ERROR: ${err}`);
    }
  }

  // select user by id
  async show(userId: string): Promise<User> {
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
  async createUser(user: UserData): Promise<User> {
    try {
      const { firstName, lastName, password } = user;
      const pepper: string = process.env.BCRYPT_PASSWORD as string;
      const salt: string = process.env.SALT_ROUNDS as string;

      const hashPassword: string = bcrypt.hashSync(
        password + pepper,
        parseInt(salt)
      );

      const connect = await client.connect();
      const sql = `INSERT INTO users (firstName, lastName, password) VALUES($1, $2, $3) RETURNING *`;
      const result = await connect.query(sql, [firstName, lastName, hashPassword]);
      connect.release();

      const id: number = result.rows[0].id;
      //   const token: string = generateToken(id);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not create user. ERROR: ${err}`);
    }
  }
}

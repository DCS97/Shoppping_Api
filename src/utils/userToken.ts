import jwt, { Secret } from 'jsonwebtoken';
import { User } from '../models/users';

const SECRET = process.env.JWT_SECRET as Secret;

export function userToken(user: User):string {
  return jwt.sign({ user }, SECRET);
}

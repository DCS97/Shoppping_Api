import dotenv from 'dotenv';
import { ClientConfig, Pool } from 'pg';

dotenv.config();

const {
  ENV,
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_DB_TEST,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  POSTGRES_PORT_TEST,
} = process.env;

const config: ClientConfig = {
  host: POSTGRES_HOST,
  port: POSTGRES_PORT as unknown as number,
  database: POSTGRES_DB,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
};
if (ENV === 'test') {
  config.port = POSTGRES_PORT_TEST as unknown as number;
  config.database = POSTGRES_DB_TEST;
}

export default new Pool(config);

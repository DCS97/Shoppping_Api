CREATE TYPE status_of_order AS ENUM ('active', 'complete');

CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  firstName VARCHAR(20) NOT NULL,
  lastName VARCHAR(20) NOT NULL,
  password VARCHAR(20) NOT NULL
);

CREATE TABLE products(
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  price NUMERIC NOT NULL,
  category VARCHAR(50)
);

CREATE TABLE orders(
  id SERIAL PRIMARY KEY,
  product_id REFERENCES products(id),
  user_id REFERENCES users(id),
  quantity INTEGER DEFAULT 1,
  status status_of_order NOT NULL,
);
CREATE TYPE status_of_order AS ENUM ('active', 'complete');

CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  firstName VARCHAR(20) NOT NULL,
  lastName VARCHAR(20) NOT NULL,
  password VARCHAR(200) NOT NULL
);

CREATE TABLE products(
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  price NUMERIC NOT NULL,
);

CREATE TABLE orders(
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users (id),
  status status_of_order NOT NULL,
);

CREATE TABLE order_products (
  order_id INTEGER NOT NULL REFERENCES orders (id),
  product_id INTEGER NOT NULL REFERENCES products (id),
  quantity INTEGER NOT NULL
);
CREATE TYPE status_of_order AS ENUM ('active', 'complete');

CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(20) NOT NULL,
  last_name VARCHAR(20) NOT NULL,
  user_password VARCHAR(200) NOT NULL
);

CREATE TABLE products(
  id SERIAL PRIMARY KEY,
  product_name VARCHAR(50) NOT NULL,
  price NUMERIC NOT NULL,
);

CREATE TABLE orders(
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users (id),
  order_status status_of_order NOT NULL,
);

CREATE TABLE order_products (
  order_id INTEGER NOT NULL REFERENCES orders (id),
  product_id INTEGER NOT NULL REFERENCES products (id),
  quantity INTEGER NOT NULL
);
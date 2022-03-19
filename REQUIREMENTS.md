# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index /products [GET]
- Create /products/create [POST] [token required]
- Show /products/:id [GET]

#### Users

- Index /users [GET] [token required]
- Create /users/create [POST]
- Show /users/:id [GET] [token required]

#### Orders

- Show /orders/:id [GET] [token required]
- Show /orders/completed/:id [GET] [token required]
- Show /orders/active/:id [GET] [token required]

## Data Shapes

#### Products

- id SERIAL PRIMARY KEY
- name VARCHAR
- price INTEGER

#### Users

- id SERIAL PRIMARY KEY
- firstname VARCHAR
- lastname VARCHAR
- password_digest VARCHAR

#### Orders

Table: orders

- id SERIAL PRIMARY KEY
- user_id INTEGER REFERENCES users(id)
- status ENUM ('active', 'complete')

Table: order_products

- order_id INTEGER REFERENCES orders(id)
- product_id INTEGER REFERENCES products(id)
- quantity INTEGER

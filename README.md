# Storefront Backend Project

## Prepare env

- add a `.env` file in the root directory and set the missing `#` environment parameters

PORT = 3000

POSTGRES_DB = shopping
POSTGRES_DB_TEST = shopping_test
POSTGRES_HOST = 127.0.0.1
POSTGRES_USER = shopping_user
POSTGRES_PASSWORD= #
POSTGRES_PORT=5432

BCRYPT_PASSWORD=#
SALT_ROUNDS=10
TOKEN_TEST = #
JWT_SECRET = #

## Set up

- `docker-compose up` to start the docker container
- `npm install` to install all dependencies
- `npm run db-up` to set up the database and get access via http://127.0.0.1:5432
- `npm run build` to build the app

## Start the app
- `npm run start` to start the app and get access via http://127.0.0.1:3000


## Test the app
- add a `database.json` file in the root directory and set the missing `###` parameters
```

{
"dev": {
"driver": "pg",
"user": ###,
"password": ###,
"host": "127.0.0.1",
"database": "shopping",
"port": 5432
},
"test": {
"driver": "pg",
"user": "shopping_user",
"password": ###,
"host": "127.0.0.1",
"database": ###,
"port": 5432
}
}

```
- `npm run test` to run all tests
```

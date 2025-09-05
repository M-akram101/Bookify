# Bookify

Bookify is a library management system to simplify the process between books and borrowers.

## Technologies Used:

Nodejs
Express
Prisma
PostgreSQL
RestfulAPIs
Github
Draw.io

## installation

1. yarn add express prisma @prisma/client joi@17.12.0

2. yarn add -D typescript ts-node @types/node @types/express nodemon

3. npx prisma init

## Running

1. Install packages

```
yarn install
```

2. Setup .env

```
cp .env.sample .env
```

3. Setup DB configure `.env` with DB info

4. Run Prisma Migration.

yarn prisma:migrate:dev

5. Run Project

```
yarn dev
```

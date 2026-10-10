# Understanding ORM and ODM in Backend Development

A conceptual guide on how client-server architectures interact with databases using Object-Relational Mappers (ORM) and Object-Document Mappers (ODM).


## 1. Request-Response Architecture

In a standard web application, data flows across three main layers:

[ Client ]  <--->  [ Server ]  <--->  [ Database ]

1. **Client:** Sends HTTP/WebSocket requests from browsers or mobile apps to the server.
2. **Server:** Runs application business logic, processes requests, and queries the database.
3. **Database:** Manages persistent storage and executes incoming queries.

## 2. The Database Interaction Problem

Databases operate using their own specific query languages and low-level communication protocols:

* **Relational Databases (RDBMS):** Communicate using **SQL** (Structured Query Language) over TCP connections (e.g., PostgreSQL, MySQL).
* **Document Databases (NoSQL):** Communicate using document wire protocols (e.g., MongoDB's binary wire protocol).

Writing raw query strings directly in JavaScript code introduces several production risks:

* Manual TCP socket connection handling and connection pool management.
* Lack of end-to-end type safety, leading to runtime failures.
* Risk of SQL injection vulnerabilities if inputs are poorly sanitized.
* High maintenance overhead when updating schemas or migrating fields.


## 3. What are ORM and ODM?

To bridge the gap between JavaScript/TypeScript code and database network protocols, applications use abstraction layers called **ORMs** and **ODMs**.

These libraries internally translate native JavaScript objects and method calls into database-specific queries and transmit them over established TCP connections.

---

### Object-Relational Mapper (ORM)

An **ORM** maps JavaScript objects to relational database tables (SQL / RDBMS).

* **Concept:** Maps JavaScript/TypeScript classes or schemas to SQL tables, rows, and foreign key relationships.
* **Popular Tools:** Prisma, Sequelize, TypeORM, Drizzle.
* **Target Databases:** PostgreSQL, MySQL, SQLite, MariaDB, SQL Server.

```javascript
// Native JavaScript ORM Call (e.g., Prisma)
const user = await prisma.user.findUnique({
  where: { id: 1 }
});

// Translated Internal SQL Query executed over TCP
// SELECT * FROM "User" WHERE "id" = 1;

### Object-Document Mapper (ODM)

An ODM maps JavaScript objects to document collections (NoSQL).

* Concept: Maps JavaScript objects directly to BSON/JSON documents and schemas.
* Popular Tools: Mongoose.
*Target Databases: MongoDB.


## Here we will use sequelize
Core Architecture & Drivers

Sequelize provides high-level abstractions for models, migrations, and transactions, but it **does not** communicate directly with the database on its own. It requires a database driver to handle low-level TCP socket connections.

* **Database Driver (`mysql2`):** Low-level client library that converts JavaScript calls into MySQL's wire protocol over TCP. You can also use `mysql2` directly if you need to execute raw SQL queries without ORM overhead.
* **ORM (`sequelize`):** High-level abstraction layer that manages database connections using `mysql2`, builds SQL queries, and maps results to JavaScript objects.

---

## 2. Installation

Install the ORM and the database driver as core dependencies, and the CLI tool as a development dependency:

```bash
# Install Sequelize ORM and MySQL driver
npm i sequelize mysql2

# Install Sequelize CLI for migrations and boilerplate generation
npm i -D sequelize-cli

### Setup sequelize cli

- add this file for better codin practive 

- hotel_service/.sequelizerc
 run -npx sequelize-cli init 

 - it generates folders and files
 - config/ :	Database configuration settings (host, port, credentials, dialect) across development, test, and production environments (config.json or config.js).
 - models/ :	Data models representing database tables, schemas, data types, and relationships (associations like hasMany, belongsTo).
 - migrations/ :	Version control for your database structure. Defines incremental, reversible changes (up and down methods) to keep schemas synchronized across teams.
 - seeders/ :	Mock or initial bootstrap data used to populate database tables for development, testing, or environment initialization.


### created airbnb db in mysqlworkbench

### create first migration
npx sequelize-cli migration:generate --name create-hotel-table


### migration has 2 things
  - up : contains code which make new changes in db
  - down : contains coed which will revert the changes back

### make changes in migrations file and run the migration it will apply

- npx sequelize-cli db:migrate
- npx sequelize-cli db:migrate:undo

### check migration applied and hotels table is created

### npm i bullmq ioredis node-cron
 - bullmq - Redis-based distributed queue for Node.js
 - ioredis - Redis client for Node.js.
 - node-cron - scheducle automated tasks that runs at a specific time interval
 - Also make sure to download redis in your specific os and start the redis server locally or also can use docker image as well


### start a redis server
  - open ubuntu
  - sudo service redis-server start
  - redis-cli
  - ping 
  - redis server is runing successfully

### Connect usin git bash
  - wsl -d Ubuntu sudo service redis-server start
  - wsl -d Ubuntu redis-cli



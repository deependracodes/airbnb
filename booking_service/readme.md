### Booking service

# npm init -y
# npx tsc --init

# dependencies
 - express
 - dotenv
 - uuid
 - zod
 - winston
 - winston-daily-rotate-file
 - ioredis
 - bullmq
 - redlock

# dev-depencies
 - @types/express 
 - @types/node
 - nodemon
 - tsx
 - typescript

# Set up a new TypeScript project that connects to MySQL using Prisma ORM, and generate a Prisma Client for type-safe access to your database. primsa(V7) | latest is 8.0 rc which is in testing [13-10-26]
 - npm i @prisma/client@7 @prisma/adapter-mariadb
 - npm i -D prisma@prev

* [prisma] - The Prisma CLI for running commands like prisma init, prisma migrate, and prisma generate
* [@prisma/client] - The Prisma Client library for querying your database
* [@prisma/adapter-mariadb] - The MySQL/MariaDB driver adapter that connects Prisma Client to your database

# Initialize Prisma ORM
 - Inside src/
 - npx prisma init --datasource-provider mysql --output ../generated/prisma
 - This command does a few things:
 * Creates a prisma/ directory with a schema.prisma file containing your database connection and schema models
 * Creates a .env file in the root directory for environment variables
 * Creates a prisma7.config.ts file for Prisma configuration

# Note 
  - since we have generated prisma inside src/
  - make sure to change the path of schema and migrations in prisma/prisma7.config.ts
  - move the prisma7.config.ts to root folder

# open prisma/schema.prisma
  - add models
  - create and apply your migration
    * This command creates the database tables based on your schema.
    - npx prisma migrate dev --name init
    * command to generate the Prisma Client
    - npx prisma generate
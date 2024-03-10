# Team Craft API

This project is a platform that facilitates the formation and management of work teams in collaborative environments.


## Run Locally

Clone the project

```bash
  git clone <project url>
```

Install dependencies

```bash
  npm install
```

Create .env file

```bash
  PORT=3005

  #prisma
  DATABASE_URL=postgresql://<user>:<password>@localhost:5432/<db>?schema=public

  # db dev locally
  POSTGRES_USER=      # Same as prisma user: <user>
  POSTGRES_DB=        # Same as prisma db: <db>
  POSTGRES_PASSWORD=  # Same as prisma password: <password>
  POSTGRES_PORT=5432

  # jwt
  APP_SECRET=
  EXPIRES=30d
```

Run docker compose

```bash
  npm run docker:dev
```

Run prisma

```bash
  npx prisma generate
```

Start the server

```bash
  npm run start:dev
```

Optional: execute seeder

```bash
  GET {{baseUrl}}/seeds/create-all 
```

## Tech Stack

**Server:** Typescript, Node.js, Express framework, PostgreSQL, Prisma ORM, Docker ( run locally DB ), Joi, JWT, Jest

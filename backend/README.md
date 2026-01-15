# Backend API

This is a RESTful API built with **NestJS** and **Prisma ORM**.

## ⚙️ Configuration

Copy the example environment file to create your local config:

```bash
cp .env.example .env
```

The default values work with the local Docker container, so no changes are needed.

## 🗄 Database & Prisma Workflow

We use **Prisma** to manage the database schema. You can find the schema file at `prisma/schema.prisma`.

### Option A: Rapid Prototyping

Use `db push` to instantly sync your schema changes to the database without generating migration files.

```bash
npx prisma db push
or
npm run db:override
```

### Option B: Production-Like Migrations

Use `migrate` to maintain a history of changes (migrations):

```bash
npx prisma migrate dev --name init_schema
or
npm run db:migrate
```

### Viewing Data

You can spin up Prisma Studio to view and edit data in your browser:

```bash
npx prisma studio
```

## 📡 API Endpoints

The server runs on **http://localhost:3000** by default.

### Swagger / OpenAPI

(Optional) If you have enabled Swagger in `main.ts`, documentation is available at:
`http://localhost:3000/api`

## 🧪 Running Tests

```bash
# Unit tests
npm run test

# e2e tests
npm run test:e2e
```

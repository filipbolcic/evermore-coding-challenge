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

### Seeding Data

To populate the database with a fresh sample set of events:

```bash
npm run db:seed
```

This seed script clears the existing `events` table and inserts events anchored around the moment the seed runs, so they stay close to the current calendar date during local development. The sample set includes daytime events, minute-offset events, back-to-back boundaries, midnight-crossing events, and a multi-day event.

## 📡 API Endpoints

The server runs on **http://localhost:3000** by default.

### Development Network Simulation

You can simulate slower and less reliable API responses in local development with these environment variables:

```env
DEV_NETWORK_SIMULATION_DELAY_MS=1200
DEV_NETWORK_SIMULATION_ERROR_FRACTION=0.25
```

Set each env to 0 to disable the middleware. `DEV_NETWORK_SIMULATION_DELAY_MS=1200` will introduce a response delay of 1200ms. With `DEV_NETWORK_SIMULATION_ERROR_FRACTION=0.25`, roughly 25% of requests will return the configured error payload instead of reaching the controller.

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

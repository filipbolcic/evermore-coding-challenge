# Evermore Coding Challenge

Welcome to the Evermore coding challenge. This repository is a **Monorepo** managed via NPM Workspaces, containing a frontend application, a backend API, and a dockerized database.

This template provides a minimal setup and all the tools you will need for this challenge. Complete as much as you can or have the knowledge for! On the coding interview, we will ask for a quick demo of the challenge, walkthrough of the code and after which we will discuss and challenge your decisions. We might also ask you to extend the solution with some additional features on the call itself! Good luck!

## Instructions

Checkout the repository, install dependencies and run the project.
Design is entirely up to you, so be as creative as you want; we have prepared MaterialUI, but feel free to pick any framework that you are comfortable with.
Typescript, TanStack, ReactQuery, and Zustand are included in the project and are encouraged to be used.
Structure files and components according to the best coding practices that you are familiar with

Once you are done, submit a Pull Request for a review and discussion

## 🏗 Project Architecture

| Service      | Technology Stack                                                   | Location             |
| :----------- | :----------------------------------------------------------------- | :------------------- |
| **Frontend** | React, TypeScript, Material UI, Zustand, TanStack (Query & Router) | `/frontend`          |
| **Backend**  | NestJS, TypeScript, Prisma ORM                                     | `/backend`           |
| **Database** | PostgreSQL 15 (Docker)                                             | `docker-compose.yml` |

---

## 🚀 Getting Started

### 1. Prerequisites

Ensure you have the following installed:

- **Node.js** (v22+ recommended)
- **Docker** & **Docker Compose**
- **NPM** (v7+ comes with Node)

### 2. Install Dependencies

From the root directory, install dependencies for all workspaces:

```bash
npm install
```

### 3. Start Infrastructure

Start the PostgreSQL database container. This must be running before starting the backend.

```bash
npm run docker:up
```

> **Note:** The database runs on port `5432`. Ensure no local Postgres instances are conflicting.

---

## 🛠 Development Workflows

We have configured root-level scripts for convenience.

| Command                | Description                                              |
| :--------------------- | :------------------------------------------------------- |
| `npm run docker:up`    | Starts the Postgres database container in detached mode. |
| `npm run docker:down`  | Stops and removes the database container.                |
| `npm run dev:backend`  | Starts the NestJS server in watch mode.                  |
| `npm run dev:frontend` | Starts the React/Vite development server.                |

### Typical Startup Routine

1. `npm run docker:up`
2. Open a new terminal: `npm run dev:backend`
3. Open a new terminal: `npm run dev:frontend`

---

## 📂 Documentation

For specific details on the sub-projects, please refer to their respective READMEs:

- [Frontend Documentation](./frontend/README.md)
- [Backend Documentation](./backend/README.md)

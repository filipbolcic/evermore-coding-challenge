# Frontend Application

This project is built with **Vite**, **React**, and **TypeScript**. It uses **Material UI** for components and **TanStack** libraries for routing and data fetching.

## 🧩 Key Technologies

- **Routing:** [TanStack Router](https://tanstack.com/router) (File-based routing)
- **Data Fetching:** [TanStack Query](https://tanstack.com/query) (React Query)
- **State Management:** [Zustand](https://github.com/pmndrs/zustand)
- **UI Components:** [Material UI (MUI)](https://mui.com/)

## 🛣 Routing Structure (File-Based)

We use **File-Based Routing**. The URL structure is determined by the files inside `src/routes/`.

| File Path                | URL Path | Description                        |
| :----------------------- | :------- | :--------------------------------- |
| `routes/__root.tsx`      | N/A      | Global layout (Navbar, Providers). |
| `routes/index.tsx`       | `/`      | Home page.                         |
| `routes/users/index.tsx` | `/users` | List of users.                     |

> **⚠️ Important:** When you create a new file in `routes/`, the router plugin automatically updates `src/routeTree.gen.ts`. You must run the dev server for this to happen.

## 💻 Development

Start the development server:

```bash
npm run dev
```

The app will be available at **http://localhost:5173**.

### Environment Variables

Create a `frontend/.env` file and define the backend base URL:

```bash
VITE_API_URL=http://localhost:3000
```

The frontend API helpers in `src/api/` use this value for all backend requests.

### DevTools

- **TanStack Router DevTools:** Located at the bottom-right of the screen. Use this to visualize the route tree and active matches.
- **React Query DevTools:** (Optional) Can be enabled in `main.tsx` to debug cache states.

## 🎨 Theme

The Material UI theme is configured in `src/main.tsx`. You can customize the color palette and typography there.

import { createBrowserRouter, redirect } from "react-router-dom";
import App from "./App.tsx";
import UserInfo from "./modules/users/user-info.tsx";
import UsersList from "./modules/users/users-list.tsx";
import { Counter } from "./modules/counters/counter.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        loader: () => redirect("/users"),
      },
      {
        path: "/users",
        element: <UsersList />,
      },
      {
        path: "/users/:id",
        element: <UserInfo />,
      },
      {
        path: "/counters",
        element: <Counter counterId="first" />,
      },
    ],
  },
]);

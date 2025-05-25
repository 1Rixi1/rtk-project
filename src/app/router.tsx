import { createBrowserRouter, redirect } from "react-router-dom";
import App from "./App.tsx";
import UserInfo from "../modules/users/user-info.tsx";
import UsersList from "../modules/users/users-list.tsx";
import { Counter } from "../modules/counters/counter.tsx";
import { fetchUsers } from "../modules/users/model/fetch-users.ts";
import { usersSlice } from "../modules/users/users.slice.ts";

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
        loader: async () => {
          const { store } = await import("./store.ts");
          store.dispatch(fetchUsers({ reFetch: false }));
          return null;
        },
      },
      {
        path: "/users/:id",
        element: <UserInfo />,
        loader: async ({ params }) => {
          const { store } = await import("./store.ts");
          store.dispatch(usersSlice.actions.fetchUser({ userId: params.id! }));
          return null;
        },
      },
      {
        path: "/counters",
        element: <Counter counterId="first" />,
      },
    ],
  },
]);

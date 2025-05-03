import { configureStore, createSelector } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { usersList, usersReducer } from "./modules/users/users.slice.ts";
import { countersReducer } from "./modules/counters/counters.slice.ts";

export const store = configureStore({
  reducer: {
    [usersReducer.name]: usersReducer.reducer,
    counters: countersReducer,
  },
});

export type AppState = ReturnType<typeof store.getState>;

export const useAppSelector = useSelector.withTypes<AppState>();

export const useAppDispatch = useDispatch.withTypes<typeof store.dispatch>();
export const createAppSelector = createSelector.withTypes<AppState>();

//DATA

store.dispatch(usersReducer.actions.storage({ users: usersList }));

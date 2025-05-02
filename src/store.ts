import {
  combineReducers,
  configureStore,
  createSelector,
} from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import {
  StorageUserAction,
  usersList,
  UsersReducer,
} from "./modules/users/users.slice.ts";
import { CountersReducer } from "./modules/counters/counters.slice.ts";

const reducer = combineReducers({
  users: UsersReducer,
  counters: CountersReducer,
});

export const store = configureStore({
  reducer: reducer,
});

export type AppState = ReturnType<typeof store.getState>;

export const useAppSelector = useSelector.withTypes<AppState>();

export const useAppDispatch = useDispatch.withTypes<typeof store.dispatch>();
export const createAppSelector = createSelector.withTypes<AppState>();

//DATA

store.dispatch({
  type: "STORAGE_USER",
  payload: { users: usersList },
} satisfies StorageUserAction);

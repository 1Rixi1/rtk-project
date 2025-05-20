import { configureStore, createSelector } from "@reduxjs/toolkit";
import { useDispatch, useSelector, useStore } from "react-redux";
import { usersSlice } from "./modules/users/users.slice.ts";
import { countersReducer } from "./modules/counters/counters.slice.ts";

export const store = configureStore({
  reducer: {
    [usersSlice.name]: usersSlice.reducer,
    counters: countersReducer,
  },
});

export type AppState = ReturnType<typeof store.getState>;

export const useAppSelector = useSelector.withTypes<AppState>();

export const useAppDispatch = useDispatch.withTypes<typeof store.dispatch>();
export const createAppSelector = createSelector.withTypes<AppState>();
export const useAppStore = useStore.withTypes<typeof store>();

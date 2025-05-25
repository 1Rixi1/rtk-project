import {
  asyncThunkCreator,
  buildCreateSlice,
  createAsyncThunk,
  createSelector,
  ThunkAction,
  UnknownAction,
} from "@reduxjs/toolkit";
import { useDispatch, useSelector, useStore } from "react-redux";
import type { store, extraArgument } from "../app/store.ts";

export type AppState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export type ExtraArgumentType = typeof extraArgument

export const useAppSelector = useSelector.withTypes<AppState>();
export const useAppDispatch = useDispatch.withTypes<typeof store.dispatch>();
export const createAppSelector = createSelector.withTypes<AppState>();
export const useAppStore = useStore.withTypes<typeof store>();

export type AppThunk<R = void> = ThunkAction<
  R,
  AppState,
  typeof extraArgument,
  UnknownAction
>;

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: AppState;
  dispatch: AppDispatch;
  extra: typeof extraArgument;
}>();

export const createSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

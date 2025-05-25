import {api} from "../shared/api.ts";
import {configureStore} from "@reduxjs/toolkit";
import {usersSlice} from "../modules/users/users.slice.ts";
import {countersReducer} from "../modules/counters/counters.slice.ts";
import {router} from "./router.tsx";

export const extraArgument = {
  api,
  router,
};

export const store = configureStore({
  reducer: {
    [usersSlice.name]: usersSlice.reducer,
    counters: countersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: { extraArgument } }),
});

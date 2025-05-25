import { createAppAsyncThunk } from "../../../shared/redux.ts";
import { usersSlice } from "../users.slice.ts";

export const fetchUsers = createAppAsyncThunk(
  "users/fetchUsers",
  ({}: { reFetch: boolean }, thunkAPI) => {
    return thunkAPI.extra.api.getUsers();
  },
  {
    condition: ({ reFetch }, { getState }) => {
      const isIdle = usersSlice.selectors.selectIsFetchUsersIdle(getState());

      if (!isIdle && !reFetch) {
        return false;
      }
      return true;
    },
  }
);

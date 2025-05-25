import { AppThunk } from "../../../shared/redux.ts";
import { UserId, usersSlice } from "../users.slice.ts";
import { fetchUsers } from "./fetch-users.ts";

export const deleteUser =
  ({ userId }: { userId: UserId }): AppThunk =>
  async (dispatch, _, { api, router }) => {
    dispatch(usersSlice.actions.deleteUserPending());

    try {
      await api.deleteUser(userId);
      await dispatch(fetchUsers({ reFetch: false }));
      await router.navigate("/users", { relative: "path" });
      dispatch(usersSlice.actions.deleteUserSuccess({ userId }));
    } catch {
      dispatch(usersSlice.actions.deleteUserError());
    }
  };

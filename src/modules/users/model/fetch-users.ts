import { AppThunk } from "../../../store.ts";
import { usersSlice } from "../users.slice.ts";

export const fetchUsers =
  (): AppThunk =>
  (dispatch, getState, { api }) => {
    const isIdle = usersSlice.selectors.selectIsFetchUsersIdle(getState());

    if (!isIdle) return;

    dispatch(usersSlice.actions.fetchUsersPending());

    api
      .getUsers()
      .then((res) => {
        dispatch(usersSlice.actions.fetchUsersSuccess({ users: res }));
      })
      .catch(() => {
        dispatch(usersSlice.actions.fetchUsersError());
      });
  };

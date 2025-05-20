import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector, useAppStore } from "../../store.ts";
import { UserId, usersSlice } from "./users.slice.ts";
import { api } from "../../shared/api.ts";

const UsersList = () => {
  const dispatch = useAppDispatch();
  const appStore = useAppStore();
  const [sortType, setSortType] = useState<"asc" | "desc">("asc");

  const users = useAppSelector((state) =>
    usersSlice.selectors.selectSortedUsers(state, sortType)
  );

  const selectSelectUserId = useAppSelector(usersSlice.selectors.selectUserId);

  const isPending = useAppSelector(
    usersSlice.selectors.selectIsFetchUsersPending
  );

  useEffect(() => {
    const isIdle = usersSlice.selectors.selectIsFetchUsersIdle(
      appStore.getState()
    );

    if (!isIdle) {
      return;
    }

    dispatch(usersSlice.actions.fetchUsersPending());

    api
      .getUsers()
      .then((res) => {
        dispatch(usersSlice.actions.fetchUsersSuccess({ users: res }));
      })
      .catch(() => {
        dispatch(usersSlice.actions.fetchUsersError());
      });
  }, []);

  if (isPending) {
    return <div>Loading ...</div>;
  }

  return (
    <>
      <button onClick={() => setSortType("asc")}>Ask</button>
      <button onClick={() => setSortType("desc")}>Desk</button>

      {!selectSelectUserId ? (
        <ul>
          {users.map((user) => {
            return <UserItem userId={user.id} key={user.id} />;
          })}
        </ul>
      ) : (
        <SelectedUser userId={selectSelectUserId} />
      )}
    </>
  );
};

const UserItem = ({ userId }: { userId: UserId }) => {
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.users.entities[userId]);

  if (!user) return null;

  const handleUser = () => {
    dispatch(usersSlice.actions.selectUsers({ userId }));
  };

  return <li onClick={handleUser}>{user.name}</li>;
};

const SelectedUser = ({ userId }: { userId: UserId }) => {
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.users.entities[userId]);

  const handleBack = () => {
    dispatch(usersSlice.actions.removeSelectUser());
  };
  if (!user) return null;
  return (
    <div>
      <p>{user.name}</p>
      <button onClick={handleBack}>Back</button>
    </div>
  );
};

export default UsersList;

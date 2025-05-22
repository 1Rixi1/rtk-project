import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store.ts";
import { usersSlice } from "./users.slice.ts";
import UserItem from "./user-item.tsx";
import { fetchUsers } from "./model/fetch-users.ts";

const UsersList = () => {
  const dispatch = useAppDispatch();

  const [sortType, setSortType] = useState<"asc" | "desc">("asc");

  const users = useAppSelector((state) =>
    usersSlice.selectors.selectSortedUsers(state, sortType)
  );

  const isPending = useAppSelector(
    usersSlice.selectors.selectIsFetchUsersPending
  );

  useEffect(() => {
    dispatch(fetchUsers());
  });

  if (isPending) {
    return <div>Loading ...</div>;
  }

  return (
    <>
      <button onClick={() => setSortType("asc")}>Ask</button>
      <button onClick={() => setSortType("desc")}>Desk</button>
      <ul>
        {users.map((user) => {
          return <UserItem userId={user.id} key={user.id} />;
        })}
      </ul>
    </>
  );
};

export default UsersList;

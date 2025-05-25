import { useState } from "react";
import { useAppSelector } from "../../shared/redux.ts";
import { usersSlice } from "./users.slice.ts";
import UserItem from "./user-item.tsx";

const UsersList = () => {
  const [sortType, setSortType] = useState<"asc" | "desc">("asc");

  const users = useAppSelector((state) =>
    usersSlice.selectors.selectSortedUsers(state, sortType)
  );

  const isPending = useAppSelector(
    usersSlice.selectors.selectIsFetchUsersPending
  );

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

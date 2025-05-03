import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store.ts";
import { UserId, usersReducer } from "./users.slice.ts";

const UsersList = () => {
  console.log("RENDER USER LIST");

  const [sortType, setSortType] = useState<"asc" | "desc">("asc");

  const users = useAppSelector((state) =>
    usersReducer.selectors.selectSortedUsers(state, sortType),
  );

  const selectSelectUserId = useAppSelector(
    usersReducer.selectors.selectUserId,
  );

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
    dispatch(usersReducer.actions.select({ userId }));
  };

  return <li onClick={handleUser}>{user.name}</li>;
};

const SelectedUser = ({ userId }: { userId: UserId }) => {
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.users.entities[userId]);

  const handleBack = () => {
    dispatch(usersReducer.actions.removeSelect());
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

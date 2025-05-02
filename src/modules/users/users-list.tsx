import { useState } from "react";
import {
  AppState,
  createAppSelector,
  useAppDispatch,
  useAppSelector,
} from "../../store.ts";
import { UserId } from "./users.slice.ts";

const selectUsersList = createAppSelector(
  (state: AppState) => state.users.ids,
  (state: AppState) => state.users.entities,
  (_: AppState, sortType: "asc" | "desc") => sortType,
  (ids, entities, sortType) =>
    ids
      .map((id) => entities[id])
      .filter((user) => user !== undefined)
      .sort((a, b) => {
        if (sortType === "asc") {
          return a.name.localeCompare(b.name);
        } else {
          return b.name.localeCompare(a.name);
        }
      }),
);

const selectUserId = (state: AppState) => state.users.selectedUserId;

const UsersList = () => {
  console.log("RENDER USER LIST");

  const [sortType, setSortType] = useState<"asc" | "desc">("asc");

  const users = useAppSelector((state) => selectUsersList(state, sortType));

  const selectSelectUserId = useAppSelector(selectUserId);

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
    dispatch({ type: "SELECTED_USER", payload: { userId: user.id } });
  };

  return <li onClick={handleUser}>{user.name}</li>;
};

const SelectedUser = ({ userId }: { userId: UserId }) => {
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.users.entities[userId]);

  const handleBack = () => {
    dispatch({ type: "REMOVE_SELECTED_USER" });
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

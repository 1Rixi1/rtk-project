import { useAppDispatch, useAppSelector } from "../../shared/redux.ts";
import { useNavigate, useParams } from "react-router-dom";
import { usersSlice } from "./users.slice.ts";
import { deleteUser } from "./model/delete-user.ts";

const UserInfo = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { id = "" } = useParams();

  const isPending = useAppSelector(
    usersSlice.selectors.selectIsFetchUserPending
  );

  const user = useAppSelector((state) =>
    usersSlice.selectors.selectUserById(state, id)
  );

  const handleBack = () => {
    navigate("..", { relative: "path" });
  };

  if (!user) return;

  if (isPending) {
    return <div>Loading ...</div>;
  }

  const handleDeleteBtn = () => {
    dispatch(deleteUser({ userId: user.id }));
  };

  return (
    <div>
      <p>{user.name}</p>
      <button onClick={handleBack}>Back</button>
      <button onClick={handleDeleteBtn}>Delete</button>
    </div>
  );
};

export default UserInfo;

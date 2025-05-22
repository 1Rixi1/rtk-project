import { useAppSelector } from "../../store.ts";
import { useNavigate, useParams } from "react-router-dom";
import { usersSlice } from "./users.slice.ts";

const UserInfo = () => {
  const navigate = useNavigate();
  const { id = "" } = useParams();

  const user = useAppSelector((state) =>
    usersSlice.selectors.selectUserById(state, id)
  );

  const handleBack = () => {
    navigate("..", { relative: "path" });
  };

  if (!user) return;

  return (
    <div>
      <p>{user.name}</p>
      <button onClick={handleBack}>Back</button>
    </div>
  );
};

export default UserInfo;

import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../shared/redux.ts";
import { UserId } from "./users.slice.ts";

const UserItem = ({ userId }: { userId: UserId }) => {
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.users.entities[userId]);

  if (!user) return null;

  const handleUser = () => {
    navigate(userId, { relative: "path" });
  };

  return <li onClick={handleUser}>{user.name}</li>;
};

export default UserItem;

import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducers/loginReducer";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleLogout = (event) => {
    event.preventDefault();
    dispatch(logout());
  };

  return (
    <div>
      <h2>blogs</h2>
      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>
    </div>
  );
};

export default Header;

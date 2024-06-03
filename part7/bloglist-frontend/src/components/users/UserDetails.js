import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { initializeUsers } from "../../reducers/userReducer";
import { useMatch } from "react-router-dom";

const UserDetails = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeUsers());
  }, [dispatch]);

  const getUserById = (id) => {
    return useSelector((state) => state.users.find((user) => user.id === id));
  };

  const match = useMatch("/users/:id");
  const user = getUserById(match.params.id);

  return (
    <div>
      <h2>{user?.name}</h2>
      <h3>Added blogs</h3>
      <ul>
        { user?.blogs.map((blog) => (
          <li key={ blog.id }>{ blog.title }</li>
        ))}
      </ul>
    </div>
  );
};

export default UserDetails;
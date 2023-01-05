import { useEffect } from "react";
import LoginForm from "./components/LoginForm";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./reducers/loginReducer";
import Header from "./components/Header";
import BlogList from "./components/blogs/BlogList";
import { Route, Routes } from "react-router-dom";
import UserList from "./components/users/UserList";
import UserDetails from "./components/users/UserDetails";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <div>
      {user ? (
        <div>
          <Header/>
          <Routes>
            <Route path="/" element={<BlogList/>}/>
            <Route path="/users" element={<UserList/>}/>
            <Route path="/users/:id" element={<UserDetails/>}/>
          </Routes>
        </div>
      ) : (
        <LoginForm/>
      )}
    </div>
  );
};

export default App;

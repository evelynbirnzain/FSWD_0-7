import Notification from "./util/Notification";
import { useField } from "../hooks";
import { useDispatch } from "react-redux";
import { login } from "../reducers/loginReducer";
import { createNotification } from "../reducers/notificationReducer";

const LoginForm = () => {
  const dispatch = useDispatch();

  const { reset: resetUsername, ...username } = useField("text", "username");
  const { reset: resetPassword, ...password } = useField(
    "password",
    "password"
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(login(username.value, password.value))
      .then(() => {
        resetUsername();
        resetPassword();
      })
      .catch(() => {
        dispatch(createNotification("wrong username or password", 5));
      });
  };

  return (
    <div>
      <h2>Login</h2>
      <Notification />
      <form onSubmit={handleSubmit}>
        <div>
          username
          <input {...username} />
        </div>
        <div>
          password
          <input {...password} />
        </div>
        <button type="submit" id="login-button">
          login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;

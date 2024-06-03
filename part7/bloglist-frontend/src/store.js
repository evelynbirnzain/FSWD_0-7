import { combineReducers } from "redux";
import notificationReducer from "./reducers/notificationReducer";
import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "./reducers/blogReducer";
import loginReducer from "./reducers/loginReducer";
import userReducer from "./reducers/userReducer";

const reducer = combineReducers({
  notification: notificationReducer,
  blogs: blogReducer,
  users: userReducer,
  user: loginReducer,
});

const store = configureStore({ reducer });

export default store;

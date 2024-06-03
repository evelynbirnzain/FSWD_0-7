import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import loginService from "../services/login";

export const loadUser = () => {
  return async (dispatch) => {
    const user = JSON.parse(window.localStorage.getItem("user"));
    if (user) {
      dispatch(_setUser(user));
      blogService.setToken(user.token);
    }
  };
};

export const login = (username, password) => {
  return async (dispatch) => {
    const user = await loginService.login({ username, password });
    window.localStorage.setItem("user", JSON.stringify(user));
    blogService.setToken(user.token);
    dispatch(_setUser(user));
  };
};

export const logout = () => {
  return async (dispatch) => {
    window.localStorage.removeItem("user");
    dispatch(_removeUser());
  };
};

const loginSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    _setUser(state, action) {
      return action.payload;
    },
    _removeUser() {
      return null;
    },
  },
});

export const { _setUser, _removeUser } = loginSlice.actions;
export default loginSlice.reducer;

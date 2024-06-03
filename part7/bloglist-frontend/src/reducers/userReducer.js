import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/users";

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll();
    dispatch(_setUsers(users));
  };
};

const userSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    _setUsers(state, action) {
      return action.payload;
    },
  },
});

export const { _setUsers } = userSlice.actions;
export default userSlice.reducer;

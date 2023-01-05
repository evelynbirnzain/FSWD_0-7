import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(_setBlogs(blogs));
  };
};

export const createBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog);
    dispatch(_addBlog(newBlog));
  };
};

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const updateObject = { ...blog, user: blog.user.id, likes: blog.likes + 1 };
    const updatedBlog = await blogService.update(blog.id, updateObject);
    updatedBlog.user = blog.user;
    updatedBlog.visible = blog.visible;
    dispatch(_updateBlog(updatedBlog));
  };
};

export const removeBlog = (blog) => {
  return async (dispatch) => {
    await blogService.remove(blog.id);
    dispatch(_deleteBlog(blog));
  };
};

const compareFn = (a, b) => b.likes - a.likes;

const blogSlice = createSlice({
  name: "blog",
  initialState: [],
  reducers: {
    _setBlogs(state, action) {
      return action.payload.sort(compareFn);
    },
    _addBlog(state, action) {
      state.push(action.payload);
    },
    _updateBlog(state, action) {
      const index = state.findIndex((blog) => blog.id === action.payload.id);
      state[index] = action.payload;
      state.sort(compareFn);
    },
    _deleteBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload.id);
    },
    toggleVisibility(state, action) {
      const index = state.findIndex((blog) => blog.id === action.payload.id);
      state[index].visible = !state[index].visible;
    },
  },
});

export const {
  _setBlogs,
  _addBlog,
  _updateBlog,
  _deleteBlog,
  toggleVisibility,
} = blogSlice.actions;
export default blogSlice.reducer;

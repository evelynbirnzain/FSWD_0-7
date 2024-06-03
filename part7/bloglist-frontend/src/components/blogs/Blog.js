import { useDispatch, useSelector } from "react-redux";
import {
  likeBlog,
  removeBlog,
  toggleVisibility,
} from "../../reducers/blogReducer";
import { createNotification } from "../../reducers/notificationReducer";

const Blog = ({ blog }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const hideWhenVisible = { display: blog.visible ? "none" : "" };
  const showWhenVisible = { display: blog.visible ? "" : "none" };

  const handleLike = (event) => {
    event.preventDefault();
    dispatch(likeBlog(blog)).then(() => {
      dispatch(createNotification(`you liked ${blog.title}`, 5));
    });
  };

  const handleRemove = (event) => {
    event.preventDefault();
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      dispatch(removeBlog(blog)).then(() => {
        dispatch(createNotification(`you removed ${blog.title}`, 5));
      });
    }
  };

  return (
    <div style={blogStyle} className={"blog"}>
      <div>
        {blog.title} {blog.author}
        <button
          style={hideWhenVisible}
          onClick={() => dispatch(toggleVisibility(blog))}
        >
          view
        </button>
        <button
          style={showWhenVisible}
          onClick={() => dispatch(toggleVisibility(blog))}
        >
          hide
        </button>
      </div>
      <div style={showWhenVisible} className={"togglableContent"}>
        <div>{blog.url}</div>
        <div>
          likes {blog.likes}
          <button id={"like-button"} onClick={handleLike}>
            like
          </button>
        </div>
        <div>{blog.user && blog.user.name}</div>
        {blog.user && currentUser.username === blog.user.username && (
          <button onClick={handleRemove}>remove</button>
        )}
      </div>
    </div>
  );
};
export default Blog;

import { createBlog } from "../../reducers/blogReducer";
import { useDispatch } from "react-redux";
import { useField } from "../../hooks";
import { createNotification } from "../../reducers/notificationReducer";
import { useRef } from "react";
import Notification from "../util/Notification";
import Togglable from "../util/Togglable";

const BlogForm = () => {
  const dispatch = useDispatch();
  const blogFormRef = useRef();

  const { reset: resetTitle, ...title } = useField("text", "title");
  const { reset: resetAuthor, ...author } = useField("text", "author");
  const { reset: resetUrl, ...url } = useField("text", "url");

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(
      createBlog({ title: title.value, author: author.value, url: url.value })
    ).then(() => {
      dispatch(
        createNotification(
          `a new blog ${title.value} by ${author.value} added`,
          5
        )
      );
      blogFormRef.current.toggleVisibility();
      resetTitle();
      resetAuthor();
      resetUrl();
    });
  };

  return (
    <div>
      <Notification />
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <h2>create new</h2>
        <form onSubmit={handleSubmit}>
          <div>
            title:
            <input {...title} />
          </div>
          <div>
            author:
            <input {...author} />
          </div>
          <div>
            url:
            <input {...url} />
          </div>
          <button id="create-button" type="submit">
            create
          </button>
        </form>
      </Togglable>
    </div>
  );
};

export default BlogForm;

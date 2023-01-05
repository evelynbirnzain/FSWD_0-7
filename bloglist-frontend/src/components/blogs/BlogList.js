import Blog from "./Blog";
import { useEffect } from "react";
import { initializeBlogs } from "../../reducers/blogReducer";
import { useDispatch, useSelector } from "react-redux";
import BlogForm from "./BlogForm";

const BlogList = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  return (
    <div>
      <BlogForm />
      {blogs?.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogList;

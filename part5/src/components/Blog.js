import { useState } from 'react'

const Blog = ({ blog, handleLike, removeBlog, currentUser }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const incrementLikes = () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1, user: blog.user.id }
    handleLike(updatedBlog)
  }

  const remove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      removeBlog(blog)
    }
  }

  console.log(blog.user, currentUser)

  return (
    <div style={blogStyle} className={'blog'}>
      <div>
        {blog.title} {blog.author}
        <button style={hideWhenVisible} onClick={toggleVisibility}>view</button>
        <button style={showWhenVisible} onClick={toggleVisibility}>hide</button>
      </div>
      <div style={showWhenVisible} className={'togglableContent'}>
        <div>{blog.url}</div>
        <div>likes {blog.likes}
          <button
            id={'like-button'}
            onClick={incrementLikes}>like
          </button>
        </div>
        <div>{blog.user && blog.user.name}</div>
        {blog.user && blog.user.username === currentUser.username && <button onClick={remove}>remove</button>}
      </div>
    </div>
  )
}

export default Blog
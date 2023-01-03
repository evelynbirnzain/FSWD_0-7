import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({})

  const handleBlogChange = (event) => {
    setNewBlog({ ...newBlog, [event.target.name]: event.target.value })
  }

  const onSubmit = (event) => {
    event.preventDefault()
    createBlog(newBlog)
    setNewBlog({})
  }

  return (<div>
    <h2>create new</h2>
    <form onSubmit={onSubmit}>
      <div>
        title:
        <input
          type="text"
          value={newBlog.title}
          name="title"
          aria-label={'title'}
          id={'title'}
          onChange={handleBlogChange}/>
      </div>
      <div>
        author:
        <input
          type="text"
          value={newBlog.author}
          name="author"
          aria-label={'author'}
          id={'author'}
          onChange={handleBlogChange}/>
      </div>
      <div>
        url:
        <input
          type="text"
          value={newBlog.url}
          name="url"
          aria-label={'url'}
          id={'url'}
          onChange={handleBlogChange}/>
      </div>
      <button
        id={'create-button'}
        type="submit">create
      </button>
    </form>
  </div>)
}

export default BlogForm
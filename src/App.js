import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs => {
      blogs.sort((a, b) => b.likes - a.likes)
      setBlogs(blogs)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('user')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password, })
      window.localStorage.setItem('user', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage('Wrong credentials')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('user')
    setUser(null)
  }

  const loginForm = () => (
    <LoginForm
      username={username}
      password={password}
      handleUsernameChange={({ target }) => setUsername(target.value)}
      handlePasswordChange={({ target }) => setPassword(target.value)}
      handleSubmit={handleLogin}
      message={message}
    />
  )

  const handleLike = (blog) => {
    blogService.update(blog.id, blog).then(updatedBlog => {
      const updated = blogs.map(b => b.id === blog.id ? updatedBlog : b)
      updated.sort((a, b) => b.likes - a.likes)
      setBlogs(updated)
    })
  }

  const removeBlog = (blog) => {
    blogService.remove(blog.id).then(() => {
      const updated = blogs.filter(b => b.id !== blog.id)
      setBlogs(updated)
    })
  }

  const blogList = () => (
    <div>
      <h2>blogs</h2>
      <p>{user.username} logged in <button onClick={handleLogout}>logout</button></p>
      {blogs.map(blog => <Blog key={blog.id} blog={blog} handleLike={handleLike} removeBlog={removeBlog} currentUser={user}/>)}
    </div>
  )

  const createBlog = (newBlog) => {
    blogService
      .create(newBlog)
      .then(created => {
        blogFormRef.current.toggleVisibility()
        setBlogs(blogs.concat(created))
        setMessage(`a new blog ${created.title} by ${created.author} added`)
        setTimeout(() => {
        }, 5000)
      })
  }

  const createForm = () => (
    <div>
      <Notification message={message}/>
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm
          createBlog={createBlog}
        ></BlogForm>
      </Togglable>
    </div>
  )


  return (
    <div>
      {user === null ? loginForm() : createForm()}
      {user !== null && blogList()}
    </div>
  )
}

export default App

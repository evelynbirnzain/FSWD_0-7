import {useState, useEffect} from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from "./components/Notification";

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))
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
      const user = await loginService.login({username, password,})
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
    <div>
      <h2>log in to application</h2>
      <Notification message={message}/>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input type="text" value={username} name="Username"
                 onChange={({target}) => setUsername(target.value)}/>
        </div>
        <div>
          password
          <input type="password" value={password} name="Password"
                 onChange={({target}) => setPassword(target.value)}/>
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )

  const blogList = () => (
    <div>
      <h2>blogs</h2>
      <Notification message={message}/>
      <p>{user.username} logged in <button onClick={handleLogout}>logout</button></p>
      {blogs.map(blog => <Blog key={blog.id} blog={blog}/>)}
    </div>
  )

  const createBlog = (event) => {
    event.preventDefault()
    blogService
      .create({title, author, url})
      .then(created => {
        setBlogs(blogs.concat(created))
        setTitle('')
        setAuthor('')
        setUrl('')
        setMessage(`a new blog ${created.title} by ${created.author} added`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
  }

  const createForm = () => (
    <div>
      <h2>create new</h2>
      <form onSubmit={createBlog}>
        <div>
          title:
          <input type="text" value={title} name="Title"
                 onChange={({target}) => setTitle(target.value)}/>
        </div>
        <div>
          author:
          <input type="text" value={author} name="Author"
                 onChange={({target}) => setAuthor(target.value)}/>
        </div>
        <div>
          url:
          <input type="text" value={url} name="URL"
                 onChange={({target}) => setUrl(target.value)}/>
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )

  return (<div>
    {user === null ? loginForm() : blogList()}
    {user !== null && createForm()}
  </div>)
}

export default App

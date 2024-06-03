const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const {initialBlogs} = require("./test_helper");

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

describe('test fetching blogs', () => {
  test('the correct amount of blogs is returned as json', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('unique identifier property is named id', async () => {
    const response = await api.get('/api/blogs')
    const blogs = response.body
    expect(blogs[0].id).toBeDefined()
  })
})

describe('test posting blogs', () => {
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: "New blog",
      author: "Me",
      url: "https://blog.com/",
      likes: 3,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsFromDb = await helper.blogsInDb()
    expect(blogsFromDb).toHaveLength(helper.initialBlogs.length + 1)
    blogsFromDb.forEach(b => delete b.id)
    expect(blogsFromDb).toContainEqual(newBlog)
  })

  test('if "likes" property is missing, it defaults to 0', async () => {
    const newBlog = {
      title: "New blog",
      author: "Me",
      url: "https://blog.com/",
    }

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(response.body.likes).toEqual(0)
    const blogsFromDb = await helper.blogsInDb()
    expect(blogsFromDb).toHaveLength(helper.initialBlogs.length + 1)
  })

  test('if "title" or "url" are missing, respond with 400', async () => {
    let newBlog = {
      author: "Me",
      url: "https://blog.com/"
    }

    await api.post('/api/blogs').send(newBlog).expect(400)

    newBlog = {
      author: "Me",
      title: "New blog",
    }

    await api.post('/api/blogs').send(newBlog).expect(400)
  })
})

describe('test deleting a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const initialBlogs = await helper.blogsInDb()
    const blogToDelete = initialBlogs[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsFromDb = await helper.blogsInDb()

    expect(blogsFromDb).toHaveLength(helper.initialBlogs.length - 1)
    expect(blogsFromDb).not.toContainEqual(blogToDelete)
  })

  test('returns status code 204 if id is not in DB', async () => {
    const id = await helper.nonExistingId()
    await api
      .delete(`/api/blogs/${id}`)
      .expect(204)

    const blogsFromDb = await helper.blogsInDb()

    expect(blogsFromDb).toHaveLength(helper.initialBlogs.length)
  })
})

describe('test updating a blog', () => {
  test('updating likes should work', async () => {
    const id = initialBlogs[0]._id
    const response = await api
      .put(`/api/blogs/${id}`)
      .send({likes: 9999})
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.likes).toEqual(9999)
  })

  test('updating other properties should not work', async () => {
    const id = initialBlogs[0]._id
    const newProperties = {
      title: "New blog",
      author: "Me",
      url: "https://blog.com/",
    }
    const response = await api
      .put(`/api/blogs/${id}`)
      .send(newProperties)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect({ title: response.body.title, author:response.body.author, url: response.body.url})
      .toEqual({title: initialBlogs[0].title, author: initialBlogs[0].author, url: initialBlogs[0].url})
  })

})

afterAll(() => {
  mongoose.connection.close()
})

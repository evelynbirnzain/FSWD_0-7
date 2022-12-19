const Blog = require('../models/blog')
const User = require("../models/user");
const blogRouter = require('express').Router()

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const body = request.body
  const creator = await User.findById(body.userId)

  body.user = creator._id
  const blog = new Blog(body)
  const savedBlog = await blog.save()
  creator.blogs = creator.blogs.concat(savedBlog._id)
  await creator.save()
  response.status(201).json(savedBlog)
})

blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
  const updated = await Blog.findByIdAndUpdate(
    request.params.id,
    {likes: request.body.likes},
    {new: true, runValidators: true, context: 'query'}
  )
  response.json(updated)
})

module.exports = blogRouter
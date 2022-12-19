const Blog = require('../models/blog')
const blogRouter = require('express').Router()

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const body = request.body
  const user = request.user
  if (!user) {
    return response.status(401).json({error: 'invalid token'})
  }

  body.user = user._id
  const blog = new Blog(body)
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})

blogRouter.delete('/:id', async (request, response) => {
  const user = request.user
  if (!user) {
    return response.status(401).json({error: 'invalid token'})
  }

  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    return response.status(404).json({error: 'blog not found'})
  }

  if (blog.user.toString() !== user._id.toString()) {
    return response.status(401).json({error: 'blog can only be deleted by creator'})
  }
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
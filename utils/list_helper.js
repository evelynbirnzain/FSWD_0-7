const _ = require('lodash');

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  if (blogs.length === 0) return 0
  return blogs.map(blog => blog.likes).reduce((sum, likes) => sum + likes)
}

const favoriteBlog = (blogs) => {
  const maxLikes = Math.max(...blogs.map(blog => blog.likes))
  return blogs.find(blog => blog.likes === maxLikes)
}

const mostBlogs = (blogs) => {
  if (!blogs || blogs.length === 0) {
    return undefined
  }
  const occurrences = _.countBy(blogs.map(b => b.author))
  const maxVal = _.max(Object.values(occurrences))
  const key = Object.entries(occurrences).find(([_, v]) => v === maxVal)[0]
  return {author: key, blogs: occurrences[key] }
}

const mostLikes = (blogs) => {
  if (!blogs || blogs.length === 0) {
    return undefined
  }
  const objs =  _(blogs)
    .groupBy('author')
    .map((blog, author) => ({
      author: author,
      likes: _.sumBy(blog, 'likes'),
    }))
    .value()
  const max = _(objs.map(o => o.likes)).max()
  return objs.find(o => o.likes === max)
}


module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}
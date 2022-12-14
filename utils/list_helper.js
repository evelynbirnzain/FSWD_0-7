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

module.exports = {
  dummy, totalLikes, favoriteBlog
}
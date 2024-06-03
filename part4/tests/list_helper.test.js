const listHelper = require('../utils/list_helper')
const testHelper = require('./test_helper')


test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(testHelper.listWithOneBlog)
    expect(result).toBe(5)
  })

  test('when list has several blogs, equals the sum of likes', () => {
    const result = listHelper.totalLikes(testHelper.initialBlogs)
    expect(result).toBe(36)
  })

  test('when empty list, equals zero', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })
})

describe('favorite blog', () => {
  test('when list has only one blog, equals that', () => {
    const result = listHelper.favoriteBlog(testHelper.listWithOneBlog)
    expect(result).toEqual(testHelper.listWithOneBlog[0])
  })

  test('when list has several blogs, equals the blog with largest number of likes', () => {
    const result = listHelper.favoriteBlog(testHelper.initialBlogs)
    expect(result).toEqual(testHelper.initialBlogs[2])
  })

  test('when empty list, is null', () => {
    const result = listHelper.favoriteBlog([])
    expect(result).toBe(undefined)
  })
})

describe('most blogs', () => {
  test('when there are several blogs, return the author with most blogs', () => {
    const result = listHelper.mostBlogs(testHelper.initialBlogs)
    expect(result).toEqual({author: "Robert C. Martin", blogs: 3})
  })

  test('when empty list, is null', () => {
    const result = listHelper.mostBlogs([])
    expect(result).toBe(undefined)
  })
})

describe('most likes', () => {
  test('when there are several blogs, return the author with most likes', () => {
    const result = listHelper.mostLikes(testHelper.initialBlogs)
    expect(result).toEqual({author: "Edsger W. Dijkstra", likes: 17})
  })

  test('when empty list, is null', () => {
    const result = listHelper.mostBlogs([])
    expect(result).toBe(undefined)
  })
})
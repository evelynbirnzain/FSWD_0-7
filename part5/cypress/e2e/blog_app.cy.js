describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Test User',
      username: 'testuser',
      password: 'testpassword'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Login')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('testuser')
      cy.get('#password').type('testpassword')
      cy.get('#login-button').click()
      cy.contains('Test User logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('testuser')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()
      cy.contains('Wrong credentials')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'testuser', password: 'testpassword' })
    })

    it('A blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('test title')
      cy.get('#author').type('test author')
      cy.get('#url').type('test url')
      cy.get('#create-button').click()
      cy.contains('test title')
    })
  })

  describe('When logged in and a blog exists', function () {
    beforeEach(function () {
      cy.login({ username: 'testuser', password: 'testpassword' })
      cy.createBlog({
        title: 'test title',
        author: 'test author',
        url: 'test url'
      })
    })

    it('A blog can be liked', function () {
      cy.contains('view').click()
      cy.contains('like').click()
      cy.contains('likes 1')
    })

    it('A blog can be deleted', function () {
      cy.contains('view').click()
      cy.contains('remove').click()
      cy.contains('test title').should('not.exist')
    })

    it('Blogs are ordered by likes', function () {
      cy.createBlog({
        title: 'The title with the most likes',
        author: 'test author 2',
        url: 'test url 2',
      })

      cy.createBlog({
        title: 'The title with the second most likes',
        author: 'test author 3',
        url: 'test url 3',
      })

      cy.contains('The title with the most likes')
        .parent()
        .contains('view')
        .click()

      cy.contains('The title with the most likes')
        .parent()
        .find('button')
        .contains('like')
        .click()

      cy.contains('The title with the most likes')
        .parent()
        .find('button')
        .contains('like')
        .click()

      cy.contains('The title with the second most likes')
        .parent()
        .contains('view')
        .click()

      cy.contains('The title with the second most likes')
        .parent()
        .find('button')
        .contains('like')
        .click()

      cy.get('.blog').eq(0).should('contain', 'The title with the most likes')
      cy.get('.blog').eq(1).should('contain', 'The title with the second most likes')
      cy.get('.blog').eq(2).should('contain', 'test title')
    })
  })
})
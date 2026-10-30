const express = require('express');
const jwt = require('jsonwebtoken');

let books = require('./booksdb.js');
const regd_users = express.Router();

const SECRET = 'fingerprint_customer';

let users = [];

// Check whether a username is already registered
const isValid = (username) => {
  return users.some(user => user.username === username);
};

// Verify username and password
const authenticatedUser = (username, password) => {
  return users.some(
    user => user.username === username && user.password === password
  );
};

// Task 7 / Task 8: Login
regd_users.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      message: 'Username and password are required'
    });
  }

  if (!authenticatedUser(username, password)) {
    return res.status(401).json({
      message: 'Invalid username or password'
    });
  }

  const token = jwt.sign(
    { username },
    SECRET,
    { expiresIn: '1h' }
  );

  req.session.authorization = {
    accessToken: token,
    username
  };

  return res.status(200).json({
    message: 'User successfully logged in',
    token
  });
});

// Task 8 / Task 9: Add or update a book review
regd_users.put('/auth/review/:isbn', (req, res) => {
  const isbn = req.params.isbn;
  const username = req.user ? req.user.username : (req.session.authorization ? req.session.authorization.username : null);
  const review = req.query.review || req.body.review;

  if (!books[isbn]) {
    return res.status(404).json({
      message: 'Book not found'
    });
  }

  if (!review || (typeof review === 'string' && !review.trim())) {
    return res.status(400).json({
      message: 'A valid review is required'
    });
  }

  books[isbn].reviews[username] = typeof review === 'string' ? review.trim() : review;

  return res.status(200).json({
    message: 'Review added or updated successfully',
    reviews: books[isbn].reviews
  });
});

// Task 9 / Task 10: Delete a book review
regd_users.delete('/auth/review/:isbn', (req, res) => {
  const isbn = req.params.isbn;
  const username = req.user ? req.user.username : (req.session.authorization ? req.session.authorization.username : null);

  if (!books[isbn]) {
    return res.status(404).json({
      message: 'Book not found'
    });
  }

  if (!books[isbn].reviews || !books[isbn].reviews[username]) {
    return res.status(404).json({
      message: 'Review not found'
    });
  }

  delete books[isbn].reviews[username];

  return res.status(200).json({
    message: 'Review deleted successfully',
    reviews: books[isbn].reviews
  });
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;

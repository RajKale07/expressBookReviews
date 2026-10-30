
const express = require('express');
const axios = require('axios');

const books = require('./booksdb.js');
const isValid = require('./auth_users.js').isValid;
const users = require('./auth_users.js').users;

const public_users = express.Router();

// Register a new user
public_users.post('/register', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            message: 'Username and password are required'
        });
    }

    if (isValid(username)) {
        return res.status(409).json({
            message: 'Username already exists'
        });
    }

    users.push({
        username,
        password
    });

    return res.status(200).json({
        message: 'User successfully registered. Now you can login'
    });
});

// Retrieve all books
public_users.get('/', (req, res) => {
    return res.status(200).json(books);
});

// Search books by ISBN
public_users.get('/isbn/:isbn', (req, res) => {
    const isbn = req.params.isbn;
    const book = books[isbn];

    if (!book) {
        return res.status(404).json({
            message: 'Book not found'
        });
    }

    return res.status(200).json({
        [isbn]: book
    });
});

// Search books by author
public_users.get('/author/:author', (req, res) => {
    const author = req.params.author.toLowerCase();

    const result = Object.entries(books)
        .filter(([isbn, book]) =>
            book.author.toLowerCase().includes(author)
        )
        .reduce((acc, [isbn, book]) => {
            acc[isbn] = book;
            return acc;
        }, {});

    return res.status(200).json(result);
});

// Search books by title
public_users.get('/title/:title', (req, res) => {
    const title = req.params.title.toLowerCase();

    const result = Object.entries(books)
        .filter(([isbn, book]) =>
            book.title.toLowerCase().includes(title)
        )
        .reduce((acc, [isbn, book]) => {
            acc[isbn] = book;
            return acc;
        }, {});

    return res.status(200).json(result);
});

// Retrieve reviews for a specific book
public_users.get('/review/:isbn', (req, res) => {
    const isbn = req.params.isbn;
    const book = books[isbn];

    if (!book) {
        return res.status(404).json({
            message: 'Book not found'
        });
    }

    return res.status(200).json(book.reviews);
});

// Axios-based API client for retrieving books.
// These functions can also be used by external client applications.
const API_URL = process.env.BOOK_API_URL || 'http://localhost:5000';

const bookClient = {
    getAllBooks: async () => {
        const response = await axios.get(`${API_URL}/`);
        return response.data;
    },

    getBooksByISBN: async (isbn) => {
        const response = await axios.get(`${API_URL}/isbn/${encodeURIComponent(isbn)}`);
        return response.data;
    },

    getBooksByAuthor: async (author) => {
        const response = await axios.get(`${API_URL}/author/${encodeURIComponent(author)}`);
        return response.data;
    },

    getBooksByTitle: async (title) => {
        const response = await axios.get(`${API_URL}/title/${encodeURIComponent(title)}`);
        return response.data;
    }
};

module.exports.general = public_users;
module.exports.bookClient = bookClient;

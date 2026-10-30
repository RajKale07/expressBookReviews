const express = require('express');
const axios = require('axios');

let books = require('./booksdb.js');
let isValid = require('./auth_users.js').isValid;
let users = require('./auth_users.js').users;

const public_users = express.Router();

// Task 6 / Task 7: Register a new user
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

    users.push({ username, password });

    return res.status(200).json({
        message: 'User successfully registered. Now you can login'
    });
});

// Task 1 & Task 10: Get the book list available in the shop using Promise / async-await
public_users.get('/', async (req, res) => {
    try {
        const getBooks = new Promise((resolve) => resolve(books));
        const bookList = await getBooks;
        return res.status(200).send(JSON.stringify(bookList, null, 4));
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

// Task 2 & Task 11: Get book details based on ISBN using Promise / async-await
public_users.get('/isbn/:isbn', (req, res) => {
    const isbn = req.params.isbn;
    const getBook = new Promise((resolve, reject) => {
        if (books[isbn]) {
            resolve(books[isbn]);
        } else {
            reject({ status: 404, message: 'Book not found' });
        }
    });

    getBook
        .then((book) => res.status(200).json({ [isbn]: book }))
        .catch((err) => res.status(err.status || 500).json({ message: err.message }));
});

// Task 3 & Task 12: Get book details based on Author using Promise / async-await
public_users.get('/author/:author', (req, res) => {
    const author = req.params.author.toLowerCase();
    const getBooksByAuthor = new Promise((resolve) => {
        const matchingBooks = {};
        for (const [isbn, book] of Object.entries(books)) {
            if (book.author.toLowerCase().includes(author)) {
                matchingBooks[isbn] = book;
            }
        }
        resolve(matchingBooks);
    });

    getBooksByAuthor
        .then((matching) => res.status(200).json(matching))
        .catch((err) => res.status(500).json({ message: err.message }));
});

// Task 4 & Task 13: Get all books based on Title using Promise / async-await
public_users.get('/title/:title', (req, res) => {
    const title = req.params.title.toLowerCase();
    const getBooksByTitle = new Promise((resolve) => {
        const matchingBooks = {};
        for (const [isbn, book] of Object.entries(books)) {
            if (book.title.toLowerCase().includes(title)) {
                matchingBooks[isbn] = book;
            }
        }
        resolve(matchingBooks);
    });

    getBooksByTitle
        .then((matching) => res.status(200).json(matching))
        .catch((err) => res.status(500).json({ message: err.message }));
});

// Task 5 / Task 6: Get book review based on ISBN
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

/* ==========================================================================
   Tasks 10 - 13: Axios implementations with Promises and async/await
   Functions to retrieve book details using Axios as required by Task 10-13.
   ========================================================================== */

const API_URL = process.env.BOOK_API_URL || 'http://localhost:5000';

// Task 10: Get all books using async/await with Axios
const getAllBooks = async () => {
    try {
        const response = await axios.get(`${API_URL}/`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Task 11: Get book details based on ISBN using Promises with Axios
const getBookByISBN = (isbn) => {
    return axios.get(`${API_URL}/isbn/${encodeURIComponent(isbn)}`)
        .then(response => response.data)
        .catch(error => { throw error; });
};

// Task 12: Get book details based on Author using async/await with Axios
const getBooksByAuthor = async (author) => {
    try {
        const response = await axios.get(`${API_URL}/author/${encodeURIComponent(author)}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Task 13: Get book details based on Title using Promises with Axios
const getBooksByTitle = (title) => {
    return axios.get(`${API_URL}/title/${encodeURIComponent(title)}`)
        .then(response => response.data)
        .catch(error => { throw error; });
};

module.exports.general = public_users;
module.exports.getAllBooks = getAllBooks;
module.exports.getBookByISBN = getBookByISBN;
module.exports.getBooksByAuthor = getBooksByAuthor;
module.exports.getBooksByTitle = getBooksByTitle;

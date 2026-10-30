const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session');

const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();

const SECRET = 'fingerprint_customer';
const PORT = 5000;

app.use(express.json());

app.use(
    '/customer',
    session({
        secret: SECRET,
        resave: true,
        saveUninitialized: true
    })
);

// Authentication middleware
app.use('/customer/auth/*', (req, res, next) => {
    let token = null;

    if (req.session && req.session.authorization) {
        token = req.session.authorization['accessToken'];
    }

    if (!token && req.headers['authorization']) {
        const authHeader = req.headers['authorization'];
        token = authHeader.startsWith('Bearer ')
            ? authHeader.substring(7)
            : authHeader;
    }

    if (!token) {
        return res.status(401).json({
            message: 'Authentication token is required'
        });
    }

    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({
                message: 'Invalid or expired token'
            });
        }

        req.user = decoded;
        next();
    });
});

// Customer routes
app.use('/customer', customer_routes);

// Public routes
app.use('/', genl_routes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

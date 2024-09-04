// src/middleware/authMiddleware.js

const { verifyToken } = require('../utils/jwtUtils');

const authenticateUser = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    try {
      const user = verifyToken(token);
      req.user = user;
      next();
    } catch (error) {
      res.status(401).json({ message: 'Invalid token' });
    }
  } else {
    res.status(401).json({ message: 'Authorization header missing' });
  }
};

const authorizeAuthor = (req, res, next) => {
  if (req.user && req.user.isAuthor) {
    next();
  } else {
    res.status(403).json({ message: 'Access denied. Authors only.' });
  }
};

module.exports = { authenticateUser, authorizeAuthor };
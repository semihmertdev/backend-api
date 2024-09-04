// src/routes/commentRoutes.js

const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const { authenticateUser } = require('../middleware/authMiddleware');

router.get('/post/:postId', commentController.getCommentsByPostId);

router.use(authenticateUser);

router.post('/', commentController.createComment);
router.put('/:id', commentController.updateComment);
router.delete('/:id', commentController.deleteComment);

module.exports = router;
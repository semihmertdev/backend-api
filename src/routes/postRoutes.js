// src/routes/postRoutes.js

const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const { authenticateUser, authorizeAuthor } = require('../middleware/authMiddleware');

router.get('/', postController.getAllPublishedPosts);
router.get('/:id', postController.getPostById);

router.use(authenticateUser);
router.use(authorizeAuthor);

router.post('/', postController.createPost);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);
router.put('/:id/publish', postController.publishPost);
router.put('/:id/unpublish', postController.unpublishPost);

module.exports = router;
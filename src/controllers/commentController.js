  // src/controller/commentController.js

  const { PrismaClient } = require('@prisma/client');

  const prisma = new PrismaClient();

  exports.getCommentsByPostId = async (req, res) => {
    try {
      const comments = await prisma.comment.findMany({
        where: { postId: parseInt(req.params.postId) },
        include: { user: { select: { username: true } } }
      });
      res.json(comments);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching comments', error: error.message });
    }
  };

  exports.createComment = async (req, res) => {
    try {
      const { content, postId } = req.body;
      const comment = await prisma.comment.create({
        data: { content, postId: parseInt(postId), userId: req.user.id }
      });
      res.status(201).json(comment);
    } catch (error) {
      res.status(400).json({ message: 'Error creating comment', error: error.message });
    }
  };

  exports.updateComment = async (req, res) => {
    try {
      const { content } = req.body;
      const comment = await prisma.comment.update({
        where: { id: parseInt(req.params.id) },
        data: { content }
      });
      res.json(comment);
    } catch (error) {
      res.status(400).json({ message: 'Error updating comment', error: error.message });
    }
  };

  exports.deleteComment = async (req, res) => {
    try {
      await prisma.comment.delete({ where: { id: parseInt(req.params.id) } });
      res.json({ message: 'Comment deleted successfully' });
    } catch (error) {
      res.status(400).json({ message: 'Error deleting comment', error: error.message });
    }
  };
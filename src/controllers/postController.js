// src/controller/postController.js

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

exports.getAllPublishedPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      where: { published: true },
      include: { author: { select: { username: true } } }
    });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts', error: error.message });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await prisma.post.findUnique({
      where: { id: parseInt(req.params.id) },
      include: { author: { select: { username: true } } }
    });
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching post', error: error.message });
  }
};

exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const post = await prisma.post.create({
      data: { title, content, authorId: req.user.id }
    });
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ message: 'Error creating post', error: error.message });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const post = await prisma.post.update({
      where: { id: parseInt(req.params.id) },
      data: { title, content }
    });
    res.json(post);
  } catch (error) {
    res.status(400).json({ message: 'Error updating post', error: error.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    await prisma.post.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting post', error: error.message });
  }
};

exports.publishPost = async (req, res) => {
  try {
    const post = await prisma.post.update({
      where: { id: parseInt(req.params.id) },
      data: { published: true }
    });
    res.json(post);
  } catch (error) {
    res.status(400).json({ message: 'Error publishing post', error: error.message });
  }
};

exports.unpublishPost = async (req, res) => {
  try {
    const post = await prisma.post.update({
      where: { id: parseInt(req.params.id) },
      data: { published: false }
    });
    res.json(post);
  } catch (error) {
    res.status(400).json({ message: 'Error unpublishing post', error: error.message });
  }
};
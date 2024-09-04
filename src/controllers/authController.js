// src/controller/authController.js
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const { generateToken } = require('../utils/jwtUtils');

const prisma = new PrismaClient();

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { username, email, password: hashedPassword }
    });
    const token = generateToken(user);
    res.status(201).json({ user: { id: user.id, username: user.username, email: user.email }, token });
  } catch (error) {
    res.status(400).json({ message: 'Registration failed', error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = generateToken(user);
    res.json({ user: { id: user.id, username: user.username, email: user.email }, token });
  } catch (error) {
    res.status(400).json({ message: 'Login failed', error: error.message });
  }
};
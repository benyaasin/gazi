const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Password validation
const isPasswordValid = (password) => {
  return password.length >= 8 && 
         /[A-Z]/.test(password) && 
         /[a-z]/.test(password) && 
         /[0-9]/.test(password);
};

// Register
router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: 'USER'
      }
    });

    // Create token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'User created successfully',
      token
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Error creating user' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Create token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Logged in successfully',
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Error logging in' });
  }
});

// Create initial admin (only for first setup)
router.post('/setup', async (req, res) => {
  try {
    const { setupKey, username, password } = req.body;
    
    // Verify setup key
    if (setupKey !== process.env.SETUP_KEY) {
      return res.status(403).json({ message: 'Yetkisiz erişim' });
    }

    const adminCount = await prisma.admin.count();
    if (adminCount > 0) {
      return res.status(400).json({ message: 'Admin hesabı zaten mevcut' });
    }

    if (!isPasswordValid(password)) {
      return res.status(400).json({ 
        message: 'Şifre en az 8 karakter uzunluğunda olmalı ve en az bir büyük harf, bir küçük harf ve bir rakam içermelidir' 
      });
    }

    const salt = await bcrypt.genSalt(12); // Increased from 10 to 12 rounds
    const hashedPassword = await bcrypt.hash(password, salt);

    const admin = await prisma.admin.create({
      data: {
        username,
        password: hashedPassword
      }
    });

    res.json({ message: 'Admin hesabı başarıyla oluşturuldu' });
  } catch (err) {
    console.error('Setup error:', err);
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

module.exports = router; 
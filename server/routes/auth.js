const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Admin Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ message: 'Tüm alanları doldurun' });
    }

    // Find admin by username
    const admin = await prisma.admin.findUnique({
      where: { username }
    });

    if (!admin) {
      return res.status(400).json({ message: 'Geçersiz kullanıcı adı veya şifre' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Geçersiz kullanıcı adı veya şifre' });
    }

    // Create token
    const token = jwt.sign(
      { id: admin.id },
      process.env.JWT_SECRET || 'defaultsecret',
      { expiresIn: '1d' }
    );

    res.json({ token });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

// Create initial admin (only for first setup)
router.post('/setup', async (req, res) => {
  try {
    const adminCount = await prisma.admin.count();
    if (adminCount > 0) {
      return res.status(400).json({ message: 'Admin hesabı zaten mevcut' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);

    const admin = await prisma.admin.create({
      data: {
        username: 'admin',
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
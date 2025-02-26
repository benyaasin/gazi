const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const auth = require('../middleware/auth');

const prisma = new PrismaClient();

// Tüm gönderileri getir
router.get('/', async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: {
          select: {
            name: true,
            email: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    res.json(posts);
  } catch (error) {
    console.error('Get posts error:', error);
    res.status(500).json({ message: 'Gönderiler alınırken bir hata oluştu' });
  }
});

// Yeni gönderi oluştur
router.post('/', auth, async (req, res) => {
  try {
    console.log('Creating new post with data:', req.body);
    console.log('User from token:', req.user);

    const { title, content, isPublished } = req.body;
    const adminId = req.user.adminId; // userId yerine adminId kullanıyoruz

    if (!title || !content) {
      return res.status(400).json({ message: 'Başlık ve içerik zorunludur' });
    }

    const post = await prisma.post.create({
      data: {
        title,
        content,
        isPublished: isPublished || false,
        authorId: adminId
      }
    });

    console.log('Post created successfully:', post);
    res.status(201).json(post);
  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).json({ 
      message: 'Gönderi oluşturulurken bir hata oluştu',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Gönderiyi ID'ye göre getir
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const post = await prisma.post.findUnique({
      where: { id: parseInt(id) },
      include: {
        author: {
          select: {
            name: true,
            email: true
          }
        }
      }
    });

    if (!post) {
      return res.status(404).json({ message: 'Gönderi bulunamadı' });
    }

    res.json(post);
  } catch (error) {
    console.error('Get post error:', error);
    res.status(500).json({ message: 'Gönderi alınırken bir hata oluştu' });
  }
});

// Gönderiyi güncelle
router.put('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, isPublished } = req.body;
    const adminId = req.user.adminId; // userId yerine adminId kullanıyoruz

    // Gönderinin mevcut sahibini kontrol et
    const existingPost = await prisma.post.findUnique({
      where: { id: parseInt(id) }
    });

    if (!existingPost) {
      return res.status(404).json({ message: 'Gönderi bulunamadı' });
    }

    if (existingPost.authorId !== adminId) {
      return res.status(403).json({ message: 'Bu gönderiyi düzenleme yetkiniz yok' });
    }

    const post = await prisma.post.update({
      where: { id: parseInt(id) },
      data: {
        title,
        content,
        isPublished
      }
    });

    res.json(post);
  } catch (error) {
    console.error('Update post error:', error);
    res.status(500).json({ message: 'Gönderi güncellenirken bir hata oluştu' });
  }
});

// Gönderiyi sil
router.delete('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const adminId = req.user.adminId; // userId yerine adminId kullanıyoruz

    // Gönderinin mevcut sahibini kontrol et
    const existingPost = await prisma.post.findUnique({
      where: { id: parseInt(id) }
    });

    if (!existingPost) {
      return res.status(404).json({ message: 'Gönderi bulunamadı' });
    }

    if (existingPost.authorId !== adminId) {
      return res.status(403).json({ message: 'Bu gönderiyi silme yetkiniz yok' });
    }

    await prisma.post.delete({
      where: { id: parseInt(id) }
    });

    res.json({ message: 'Gönderi başarıyla silindi' });
  } catch (error) {
    console.error('Delete post error:', error);
    res.status(500).json({ message: 'Gönderi silinirken bir hata oluştu' });
  }
});

module.exports = router; 
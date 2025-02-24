const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const auth = require('../middleware/auth');

const prisma = new PrismaClient();

// Get all content
router.get('/', async (req, res) => {
  try {
    const content = await prisma.content.findMany({
      orderBy: [
        { page: 'asc' },
        { order: 'asc' }
      ]
    });
    res.json(content);
  } catch (err) {
    console.error('Content fetch error:', err);
    res.status(500).json({ message: 'İçerik yüklenirken bir hata oluştu' });
  }
});

// Add new content (protected)
router.post('/', auth, async (req, res) => {
  try {
    const { page, section, title } = req.body;
    
    if (!page || !section || !title) {
      return res.status(400).json({ message: 'Sayfa, bölüm ve başlık alanları zorunludur' });
    }

    const newContent = await prisma.content.create({
      data: {
        ...req.body,
        order: req.body.order || 0
      }
    });
    res.json(newContent);
  } catch (err) {
    console.error('Content creation error:', err);
    res.status(500).json({ message: 'İçerik oluşturulurken bir hata oluştu' });
  }
});

// Update content (protected)
router.put('/:id', auth, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Geçersiz ID' });
    }

    const existingContent = await prisma.content.findUnique({
      where: { id }
    });

    if (!existingContent) {
      return res.status(404).json({ message: 'İçerik bulunamadı' });
    }

    const updatedContent = await prisma.content.update({
      where: { id },
      data: req.body
    });
    res.json(updatedContent);
  } catch (err) {
    console.error('Content update error:', err);
    res.status(500).json({ message: 'İçerik güncellenirken bir hata oluştu' });
  }
});

// Delete content (protected)
router.delete('/:id', auth, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Geçersiz ID' });
    }

    const existingContent = await prisma.content.findUnique({
      where: { id }
    });

    if (!existingContent) {
      return res.status(404).json({ message: 'İçerik bulunamadı' });
    }

    await prisma.content.delete({
      where: { id }
    });
    res.json({ message: 'İçerik başarıyla silindi' });
  } catch (err) {
    console.error('Content deletion error:', err);
    res.status(500).json({ message: 'İçerik silinirken bir hata oluştu' });
  }
});

module.exports = router; 
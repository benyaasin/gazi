const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const auth = require('../middleware/auth');

// Yazı düzenleme
router.put('/posts/:id', auth, async (req, res) => {
  try {
    const { title, content, isPublished } = req.body;
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Yazı bulunamadı' });
    }

    post.title = title || post.title;
    post.content = content || post.content;
    post.isPublished = isPublished !== undefined ? isPublished : post.isPublished;
    post.updatedAt = Date.now();

    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Yazı silme
router.delete('/posts/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Yazı bulunamadı' });
    }

    await post.remove();
    res.json({ message: 'Yazı başarıyla silindi' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Yazı yayınlama durumunu değiştirme
router.patch('/posts/:id/publish', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Yazı bulunamadı' });
    }

    post.isPublished = !post.isPublished;
    post.updatedAt = Date.now();

    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ... existing code ... 
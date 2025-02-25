const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const auth = require('../middleware/auth');

const prisma = new PrismaClient();

// Get all posts (public)
router.get('/', async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      where: {
        isPublished: true
      },
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
    console.error('Error fetching posts:', error);
    res.status(500).json({ message: 'Error fetching posts' });
  }
});

// Get single post (public)
router.get('/:id', async (req, res) => {
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: parseInt(req.params.id)
      },
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
      return res.status(404).json({ message: 'Post not found' });
    }

    if (!post.isPublished) {
      return res.status(403).json({ message: 'Post is not published' });
    }

    res.json(post);
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({ message: 'Error fetching post' });
  }
});

// Create post (protected)
router.post('/', auth, async (req, res) => {
  try {
    const { title, content, isPublished } = req.body;
    const userId = req.user.userId;

    const post = await prisma.post.create({
      data: {
        title,
        content,
        isPublished: isPublished || false,
        authorId: userId
      }
    });

    res.status(201).json(post);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ message: 'Error creating post' });
  }
});

// Update post (protected)
router.put('/:id', auth, async (req, res) => {
  try {
    const { title, content, isPublished } = req.body;
    const postId = parseInt(req.params.id);
    const userId = req.user.userId;

    // Check if post exists and belongs to user
    const existingPost = await prisma.post.findFirst({
      where: {
        id: postId,
        authorId: userId
      }
    });

    if (!existingPost) {
      return res.status(404).json({ message: 'Post not found or unauthorized' });
    }

    const updatedPost = await prisma.post.update({
      where: {
        id: postId
      },
      data: {
        title,
        content,
        isPublished
      }
    });

    res.json(updatedPost);
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json({ message: 'Error updating post' });
  }
});

// Delete post (protected)
router.delete('/:id', auth, async (req, res) => {
  try {
    const postId = parseInt(req.params.id);
    const userId = req.user.userId;

    // Check if post exists and belongs to user
    const existingPost = await prisma.post.findFirst({
      where: {
        id: postId,
        authorId: userId
      }
    });

    if (!existingPost) {
      return res.status(404).json({ message: 'Post not found or unauthorized' });
    }

    await prisma.post.delete({
      where: {
        id: postId
      }
    });

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ message: 'Error deleting post' });
  }
});

module.exports = router; 
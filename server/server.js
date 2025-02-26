require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');
const { v4: uuidv4 } = require('uuid');

const prisma = new PrismaClient();
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`, {
    body: req.body,
    headers: req.headers
  });
  next();
});

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'API is running' });
});

// In-memory database (gerçek uygulamada bir veritabanı kullanılmalı)
let contents = [
  {
    id: uuidv4(),
    page: 'home',
    section: 'hero',
    title: 'Gazi Teknik Kombi Servisi',
    content: 'Profesyonel kombi bakım ve onarım hizmetleri'
  },
  {
    id: uuidv4(),
    page: 'about',
    section: 'mission',
    title: 'Misyonumuz',
    content: 'Müşterilerimize en kaliteli kombi servis hizmetini sunmak'
  }
];

// Auth middleware (basit bir örnek)
const authMiddleware = (req, res, next) => {
  const token = req.headers['x-auth-token'];
  if (!token) {
    return res.status(401).json({ message: 'Yetkilendirme başarısız' });
  }
  // Gerçek uygulamada token doğrulaması yapılmalı
  next();
};

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

app.get('/api/content', authMiddleware, (req, res) => {
  res.json(contents);
});

app.post('/api/content', authMiddleware, (req, res) => {
  const newContent = {
    id: uuidv4(),
    ...req.body
  };
  contents.push(newContent);
  res.status(201).json(newContent);
});

app.put('/api/content/:id', authMiddleware, (req, res) => {
  const { id } = req.params;
  const contentIndex = contents.findIndex(c => c.id === id);
  
  if (contentIndex === -1) {
    return res.status(404).json({ message: 'İçerik bulunamadı' });
  }

  contents[contentIndex] = {
    ...contents[contentIndex],
    ...req.body,
    id // id değişmemeli
  };

  res.json(contents[contentIndex]);
});

app.delete('/api/content/:id', authMiddleware, (req, res) => {
  const { id } = req.params;
  const contentIndex = contents.findIndex(c => c.id === id);
  
  if (contentIndex === -1) {
    return res.status(404).json({ message: 'İçerik bulunamadı' });
  }

  contents = contents.filter(c => c.id !== id);
  res.status(204).send();
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error details:', {
    message: err.message,
    stack: err.stack,
    details: err
  });
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

async function startServer() {
  try {
    await prisma.$connect();
    console.log('Database connected successfully');
    
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
}

startServer(); 
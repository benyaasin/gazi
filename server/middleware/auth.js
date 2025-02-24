const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    // Get token from header
    const token = req.header('x-auth-token');

    // Check if no token
    if (!token) {
      return res.status(401).json({ message: 'Yetkilendirme hatası: Token bulunamadı' });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'defaultsecret');
      req.admin = decoded;
      next();
    } catch (err) {
      res.status(401).json({ message: 'Yetkilendirme hatası: Geçersiz token' });
    }
  } catch (err) {
    console.error('Auth middleware error:', err);
    res.status(500).json({ message: 'Sunucu hatası' });
  }
}; 
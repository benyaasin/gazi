const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).json({ message: 'Authorization header eksik' });
    }

    const token = authHeader.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'Token eksik' });
    }

    console.log('Verifying token:', token);
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token:', decodedToken);

    if (!decodedToken.adminId) {
      return res.status(403).json({ message: 'Yetkilendirme başarısız - Admin yetkisi gerekli' });
    }

    req.user = decodedToken;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).json({ 
      message: 'Kimlik doğrulama başarısız',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}; 
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET || 'default_secret_key';

const authentication = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token is required' });
  }

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid access token' });
    }

    // ✅ normalize token payload fields
    req.user = {
      user_id: decoded.user_id || decoded.id, // supports both names
      role: decoded.role,
      username: decoded.username || decoded.user || null, // optional
    };

    next();
  });
};

module.exports = authentication;
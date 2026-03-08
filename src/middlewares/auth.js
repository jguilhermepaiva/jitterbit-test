const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || 'jitterbit_secret_key_123';

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Acesso negado. Token não fornecido.' });
  }

  try {
    const token = authHeader.split(' ')[1] || authHeader;
    
    jwt.verify(token, SECRET);
    
     next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido ou expirado.' });
  }
};
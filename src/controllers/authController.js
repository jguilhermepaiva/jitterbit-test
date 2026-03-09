const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || "jitterbit_secret_key_123";

exports.login = async (req, res) => {
  const { email, password } = req.body;

  // Simulação de usuário (em um app real, buscaria no banco)
  if (email === 'admin@admin.com' && password === '123456') {
    const token = jwt.sign({ email }, SECRET, { expiresIn: '1h' });
    return res.json({ 
        auth: true, 
        token: token 
    });
  }

  return res.status(401).json({ error: 'E-mail ou senha inválidos' });
};
const jwt = require("jsonwebtoken");

// Chave secreta para validação (o padrão ideal é vir sempre do .env)
const SECRET = process.env.JWT_SECRET || "jitterbit_secret_key_123";

/**
 * Middleware de Autenticação JWT
 * Intercepta as requisições protegidas, verifica a presença e a validade
 * do token Bearer. Se válido, libera o acesso chamando next().
 */
module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Acesso negado. Token não fornecido." });
  }

  try {
    // Isola o token da string "Bearer <token>"
    const token = authHeader.split(" ")[1] || authHeader;

    // Verifica a assinatura do token
    jwt.verify(token, SECRET);

    // Libera a requisição para o Controller
    next();
  } catch (error) {
    return res.status(401).json({ error: "Token inválido ou expirado." });
  }
};

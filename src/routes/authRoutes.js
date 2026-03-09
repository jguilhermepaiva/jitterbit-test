const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController'); 

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Realiza o login e retorna o token JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: usuario@email.com
 *               password:
 *                 type: string
 *                 example: senha123
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: E-mail ou senha inválidos
 */
router.post('/login', AuthController.login);
module.exports = router;
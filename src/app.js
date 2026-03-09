const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

// Importação das rotas e middlewares
const orderRoutes = require("./routes/orderRoutes");
const authRoutes = require("./routes/authRoutes"); 
const authMiddleware = require("./middlewares/auth");

const app = express();

//Middlewares
app.use(cors());
app.use(express.json());

// Rota para a documentação visual
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//Rota de Health check
app.get("/health", (req, res) => {
  res.status(200).json({ message: "OK" });
});

// Rota de autenticação (Login simulado)
// Rotas públicas (Não precisam de token)
app.use("/auth", authRoutes);

// As rotas de pedidos
// Passamos o authMiddleware ANTES das rotas de pedidos.
app.use("/order", authMiddleware, orderRoutes);

module.exports = app;

const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Importação das rotas e middlewares
const orderRoutes = require("./routes/orderRoutes");
const authMiddleware = require("./middlewares/auth");

const app = express();

//Middlewares
app.use(cors());
app.use(express.json());

//Rota de Health check
app.get("/health", (req, res) => {
  res.status(200).json({ message: "OK" });
});

// Rota de autenticação (Login simulado)
app.post("/auth/login", (req, res) => {
  const SECRET = process.env.JWT_SECRET || "jitterbit_secret_key_123";
  const token = jwt.sign({ user: "admin_jitterbit" }, SECRET, { expiresIn: "1h" });
  res.status(200).json({ token });
});

// As rotas de pedidos
// Passamos o authMiddleware ANTES das rotas de pedidos.
app.use("/order", authMiddleware, orderRoutes);

module.exports = app;

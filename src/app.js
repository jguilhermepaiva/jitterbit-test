const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

//Middlewares
app.use(cors());
app.use(express.json());

//Rota de teste  
app.get("/health", (req, res) => {
  res.status(200).json({ message: "OK" });
});


// As rotas de pedidos entrarão aqui
// app.use('/order', orderRoutes)...

module.exports = app;
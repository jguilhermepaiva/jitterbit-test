const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/orderController');

/**
 * Definição das Rotas de Pedidos
 * O prefixo '/order' já está configurado no app.js.
 */

// POST / - Cria um novo pedido
router.post('/', OrderController.create); 

// GET /list - Lista todos os pedidos
router.get('/list', OrderController.list);

// GET /:id - Busca os dados de um pedido pelo número
router.get('/:id', OrderController.getById);

// PUT /:id - Atualiza os dados de um pedido existente
router.put('/:id', OrderController.update);

// DELETE /:id - Deleta o pedido e seus itens
router.delete('/:id', OrderController.delete);

module.exports = router;
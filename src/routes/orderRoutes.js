const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/orderController');


/**
 * @swagger
 * /order:
 *   post:
 *     summary: Cria um novo pedido com Data Mapping
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               numeroPedido:
 *                 type: string
 *               "valor Total":
 *                 type: number
 *               dataCriacao:
 *                 type: string
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *     responses:
 *       201:
 *         description: Pedido criado e mapeado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       401:
 *         description: Token não fornecido ou inválido
 */
router.post('/', OrderController.create); 

/**
 * @swagger
 * /order/list:
 *   get:
 *     summary: Lista todos os pedidos cadastrados (Opcional)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de pedidos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       401:
 *         description: Token não fornecido ou inválido
 */
router.get('/list', OrderController.list);

/**
 * @swagger
 * /order/{id}:
 *   get:
 *     summary: Busca um pedido pelo ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Dados do pedido encontrados
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: Pedido não encontrado
 *
 *   put:
 *     summary: Atualiza dados de um pedido existente
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               "valor Total":
 *                 type: number
 *                 example: 15000
 *               dataCriacao:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Pedido atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       401:
 *         description: Token não fornecido ou inválido
 *
 *   delete:
 *     summary: Remove um pedido e seus itens associados
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Pedido deletado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Pedido deletado com sucesso.
 *       401:
 *         description: Token não fornecido ou inválido
 */
router.get('/:id', OrderController.getById);
router.put('/:id', OrderController.update);
router.delete('/:id', OrderController.delete);

module.exports = router;
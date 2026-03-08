const orderService = require("../services/orderService");

class OrderController {
  /**
   * POST /order
   * Retorna 201 Created em caso de sucesso ou 400/500 em caso de falha.
   */
  async create(req, res) {
    try {
      const orderData = req.body;
      if (!orderData || !orderData.numeroPedido) {
        return res.status(400).json({ error: 'O campo "numeroPedido" é obrigatório.' }); //
      }
      const newOrder = await orderService.createOrder(orderData);
      return res.status(201).json(newOrder);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  /**
   * GET /order/:id
   * Retorna 200 Ok em caso de sucesso ou 404 em caso de falha.
   */
  async getById(req, res) {
    try {
      const { id } = req.params;
      const order = await orderService.getOrderById(id);
      return res.status(200).json(order);
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  }

  /**
   * GET /order/list
   * Retorna 200 Ok em caso de sucesso ou 500 em caso de falha.
   */
  async list(req, res) {
    try {
      const orders = await orderService.listAll();
      return res.status(200).json(orders);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  /**
   * PUT /order/:id
   * Retorna 200 Ok em caso de sucesso ou 400 em caso de falha.
   */
  async update(req, res) {
    try {
      const { id } = req.params;
      const updatedOrder = await orderService.updateOrder(id, req.body);
      return res.status(200).json(updatedOrder);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  /**
   * DELETE /order/:id
   * Retorna 200 Ok em caso de sucesso ou 400 em caso de falha.
   */
  async delete(req, res) {
    try {
      const { id } = req.params;
      await orderService.deleteOrder(id);
      return res.status(200).json({ message: "Pedido deletado com sucesso." }); //
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new OrderController();

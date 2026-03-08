const orderService = require('../services/orderService');

exports.create = async (req, res) => {
  try {
    const orderData = req.body;

    // Validação robusta exigida 
    if (!orderData || !orderData.numeroPedido) {
      return res.status(400).json({ error: 'O campo numeroPedido é obrigatório.' });
    }

    // Chama o Service para transformar e salvar
    const newOrder = await orderService.createOrder(orderData);

    // Retorna o status 201 de sucesso conforme as boas práticas [cite: 313]
    return res.status(201).json(newOrder);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
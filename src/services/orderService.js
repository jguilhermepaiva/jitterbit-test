const prisma = require("../config/prisma");

class OrderService {
  /**
   * Realiza o Data Mapping obrigatório.
   * Transforma as chaves do JSON em português para o padrão do banco (inglês).
   */
  mapToDatabase(rawData) {
    return {
      orderId: rawData.numeroPedido,
      value: rawData["valor Total"],
      creationDate: new Date(rawData.dataCriacao),
      items: {
        create: rawData.items.map((item) => ({
          productid: parseInt(item.idItem),
          quantity: item.quantidadeltem,
          price: item.valorltem,
        })),
      },
    };
  }

  /**
   * Formata a resposta da API para se alinhar ao protótipo do desafio.
   * Remove o campo redundante 'orderId' de dentro do array de items.
   */
  formatResponse(order) {
    if (!order) return null;
    return {
      ...order,
      items: order.items.map(({ orderId, ...itemProps }) => itemProps), // Remove apenas o orderId que estava sendo duplicado no retorno
    };
  }

  /**
   * Cria um novo pedido no banco de dados.
   */
  async createOrder(rawData) {
    try {
      const data = this.mapToDatabase(rawData);
      const newOrder = await prisma.order.create({
        data,
        include: { items: true },
      });
      return this.formatResponse(newOrder);
    } catch (error) {
      throw new Error(`Falha ao criar pedido: ${error.message}`);
    }
  }

  /**
   * Busca um pedido específico pelo seu ID.
   */
  async getOrderById(orderId) {
    try {
      const order = await prisma.order.findUnique({
        where: { orderId },
        include: { items: true },
      });
      if (!order) throw new Error("Pedido não encontrado.");
      return this.formatResponse(order);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Lista todos os pedidos cadastrados.
   */
  async listAll() {
    const orders = await prisma.order.findMany({ include: { items: true } });
    return orders.map((order) => this.formatResponse(order));
  }

  /**
   * Atualiza o valor e a data de criação de um pedido existente.
   */
  async updateOrder(orderId, rawData) {
    try {
      const data = {
        value: rawData["valor Total"],
        creationDate: new Date(rawData.dataCriacao),
      };

      const updatedOrder = await prisma.order.update({
        where: { orderId },
        data,
        include: { items: true },
      });

      return this.formatResponse(updatedOrder);
    } catch (error) {
      throw new Error(`Falha ao atualizar pedido ${orderId}: ${error.message}`);
    }
  }

  /**
   * Deleta um pedido.
   * Utiliza $transaction para garantir que os itens e o pedido 
   * sejam deletados de forma segura e consistente.
   */
  async deleteOrder(orderId) {
    try {
      return await prisma.$transaction([
        prisma.items.deleteMany({ where: { orderId } }),
        prisma.order.delete({ where: { orderId } }),
      ]);
    } catch (error) {
      throw new Error(`Erro ao deletar pedido: ${error.message}`);
    }
  }
}

module.exports = new OrderService();

const prisma = require("../config/prisma");

class OrderService {
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

  formatResponse(order) {
    if (!order) return null;
    return {
      ...order,
      items: order.items.map(({ orderId, ...itemProps }) => itemProps), // Remove apenas o orderId que estava sendo duplicado no retorno
    };
  }

  async createOrder(rawData) {
    try {
      const data = this.mapToDatabase(rawData);
      return await prisma.order.create({
        data,
        include: { items: true },
      });
    } catch (error) {
      throw new Error(`Falha ao criar pedido: ${error.message}`);
    }
  }

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

  async listAll() {
    const orders = await prisma.order.findMany({ include: { items: true } });
    return orders.map((order) => this.formatResponse(order));
  }

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

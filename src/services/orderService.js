const prisma = require('../config/prisma');

class OrderService {

  mapToDatabase(rawData) {
    return {
      orderId: rawData.numeroPedido,           
      value: rawData["valor Total"],          
      creationDate: new Date(rawData.dataCriacao), 
      
      items: {
        create: rawData.items.map(item => ({
          productid: parseInt(item.idItem),   
          quantity: item.quantidadeltem,      
          price: item.valorltem               
        }))
      }
    };
  }

  async createOrder(rawData) {
    try {
      const data = this.mapToDatabase(rawData);
      return await prisma.order.create({
        data,
        include: { items: true } 
      });
    } catch (error) {
      throw new Error(`Falha ao criar pedido: ${error.message}`);
    }
  }

  async getOrderById(orderId) {
    try {
      const order = await prisma.order.findUnique({
        where: { orderId },
        include: { items: true }
      });
      if (!order) throw new Error("Pedido não encontrado.");
      return order;
    } catch (error) {
      throw error;
    }
  }

  async listAll() {
    return await prisma.order.findMany({ include: { items: true } });
  }

  async updateOrder(orderId, rawData) {
    try {
      const data = {
        value: rawData["valor Total"],
        creationDate: new Date(rawData.dataCriacao),
      };

      return await prisma.order.update({
        where: { orderId },
        data,
        include: { items: true }
      });
    } catch (error) {
      throw new Error(`Falha ao atualizar pedido ${orderId}: ${error.message}`);
    }
  }

  async deleteOrder(orderId) {
    await prisma.items.deleteMany({ where: { orderId } });
    return await prisma.order.delete({ where: { orderId } });
  }
}

module.exports = new OrderService();
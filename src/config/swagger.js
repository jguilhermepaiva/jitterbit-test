const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Jitterbit Order API',
      version: '1.0.0',
      description: 'API de integração e mapeamento de pedidos para o desafio técnico Jitterbit.',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor Local',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        // Definição do modelo de Item conforme o PDF [cite: 289-293]
        Item: {
          type: 'object',
          properties: {
            productid: { type: 'integer', example: 2434 },
            quantity: { type: 'integer', example: 1 },
            price: { type: 'number', example: 1000 },
          },
        },
        // Definição do modelo de Pedido conforme o PDF [cite: 283-287]
        Order: {
          type: 'object',
          properties: {
            orderId: { type: 'string', example: 'v10089015vdb-01' },
            value: { type: 'number', example: 10000 },
            creationDate: { type: 'string', format: 'date-time', example: '2023-07-19T12:24:11.529Z' },
            items: {
              type: 'array',
              items: { $ref: '#/components/schemas/Item' },
            },
          },
        },
      },
    },
  },
  // Onde o swagger-jsdoc vai procurar as anotações (nas suas rotas)
  apis: ['./src/routes/*.js', './routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
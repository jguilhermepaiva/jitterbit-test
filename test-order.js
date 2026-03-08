const orderService = require('./src/services/orderService');

const mockInput = {
  "numeroPedido": "v10089015vdb-01",
  "valor Total": 10000,
  "dataCriacao": "2023-07-19T12:24:11.5299601+00:00",
  "items": [
    {
      "idItem": "2434",
      "quantidadeltem": 1,
      "valorltem": 1000
    }
  ]
};

console.log("🚀 Iniciando teste de mapeamento...");

try {
  const result = orderService.mapToDatabase(mockInput);
  
  // Verificações baseadas no PDF
  console.log("Check orderId:", result.orderId === "v10089015vdb-01" ? "✅" : "❌");
  console.log("Check value:", result.value === 10000 ? "✅" : "❌");
  console.log("Check Date type:", result.creationDate instanceof Date ? "✅" : "❌");
  console.log("Check Item productid:", result.items.create[0].productid === 2434 ? "✅" : "❌");
  
  console.log("\nObjeto Mapeado Final:");
  console.log(JSON.stringify(result, null, 2));
} catch (e) {
  console.error("❌ Erro no teste:", e.message);
}
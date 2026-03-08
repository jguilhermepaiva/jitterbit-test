const app = require("./app");

// Define a porta 3000 conforme o padrão dos exemplos do desafio
const PORT = process.env.PORT || 3000;

/**
 * Inicialização do Servidor e o arquivo server.js é separado do app.js para
 * facilitar a execução de testes automatizados no futuro, sem abrir portas desnecessárias.
 */
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

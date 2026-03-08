# Jitterbit Technical Test - Order Integration API 🚀

Este projeto consiste em uma API robusta desenvolvida para o desafio técnico da **Jitterbit**, focada na integração e transformação de dados de pedidos. A aplicação recebe dados de um sistema externo em um formato específico e realiza o mapeamento (mapping) para uma estrutura de banco de dados relacional.

## 🏗️ Arquitetura e Padrões

A API segue o padrão **MSC (Model-Service-Controller)** para garantir a separação de responsabilidades e organização do código:

* **Controllers**: Responsáveis pela comunicação HTTP, validação de entrada e retorno dos status codes adequados (201, 200, 404, 500).
* **Services**: Onde reside a inteligência de **Data Mapping**, transformando as chaves em português para o padrão internacional do banco de dados.
* **Prisma Schema**: Definição rigorosa das tabelas `Order` e `Items` conforme os requisitos técnicos solicitados.

## 🛠️ Tecnologias Utilizadas

* **Node.js & Express**: Core da aplicação e roteamento.
* **Prisma ORM (v7)**: Gerenciamento e modelagem do banco de dados com suporte a transações.
* **PostgreSQL**: Banco de dados relacional para persistência dos dados.
* **Docker & Docker Compose**: Containerização do ambiente de banco de dados para facilitar o setup.

## 🔄 Lógica de Transformação (Data Mapping)

Um dos pilares do projeto é a transformação obrigatória dos dados recebidos. A API traduz o JSON de entrada para o formato final de persistência:

| Campo Recebido (Input) | Campo no Banco (Output) |
| :--- | :--- |
| `numeroPedido` | `orderId` |
| `valor Total` | `value` |
| `dataCriacao` | `creationDate` |
| `idItem` | `productid` |
| `quantidadeltem` | `quantity` |
| `valorltem` | `price` |

> **Diferencial Técnico**: Implementada a função `formatResponse` para garantir que o retorno da API seja idêntico ao protótipo solicitado, removendo IDs redundantes e garantindo a limpeza dos dados.

## 🛠️ Como Rodar o Projeto

1.  **Clone o repositório e instale as dependências**:
    ```bash
    npm install
    ```
2.  **Suba o banco de dados via Docker**:
    ```bash
    docker-compose up -d
    ```
3.  **Configure as variáveis de ambiente**:
    Crie um arquivo `.env` na raiz com a sua `DATABASE_URL` (Ex: `postgresql://johndoe:randompassword@localhost:5432/jitterbit_db`).
4.  **Execute as migrações do Prisma**:
    ```bash
    npx prisma migrate dev
    ```
5.  **Inicie o servidor**:
    ```bash
    npm run dev
    ```

## 📡 Endpoints da API

| Método | Endpoint | Descrição |
| :--- | :--- | :--- |
| **POST** | `/order` | Cria um novo pedido com **Data Mapping** obrigatório. |
| **GET** | `/order/list` | Lista todos os pedidos cadastrados (Opcional). |
| **GET** | `/order/:id` | Busca os detalhes de um pedido específico. |
| **PUT** | `/order/:id` | Atualiza dados de um pedido existente (Opcional). |
| **DELETE** | `/order/:id` | Remove um pedido e seus itens via **Transação** (Opcional). |

---
Desafio desenvolvido para o processo seletivo da **Jitterbit**.

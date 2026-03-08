const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');

// 1. Cria a pool de conexão (o 'cano' que liga ao banco no Docker)
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// 2. Instancia o adaptador para o PostgreSQL
const adapter = new PrismaPg(pool);

// 3. Cria a instância única do Prisma que será usada por toda a API
const prisma = new PrismaClient({ adapter });

module.exports = prisma;
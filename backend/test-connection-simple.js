/**
 * Script simples para testar a conexão com a base de dados
 */

const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

async function testConnection() {
  console.log('🔌 A testar conexão com a base de dados PostgreSQL...\n');
  console.log('Configuração:');
  console.log(`  Host: ${process.env.DB_HOST}`);
  console.log(`  Port: ${process.env.DB_PORT}`);
  console.log(`  Database: ${process.env.DB_NAME}`);
  console.log(`  User: ${process.env.DB_USER}`);
  console.log('');

  try {
    const client = await pool.connect();
    const result = await client.query('SELECT NOW(), version()');

    console.log('✅ CONEXÃO ESTABELECIDA COM SUCESSO!\n');
    console.log('Informações do servidor:');
    console.log(`  Timestamp: ${result.rows[0].now}`);
    console.log(`  Versão: ${result.rows[0].version.split(',')[0]}\n`);

    client.release();
    process.exit(0);
  } catch (error) {
    console.error('❌ ERRO AO CONECTAR:\n');
    console.error(`  ${error.message}\n`);
    console.error('💡 Verificações:');
    console.error('  1. Está conectado à VPN da universidade? (se necessário)');
    console.error('  2. As credenciais no .env estão corretas?');
    console.error('  3. O servidor está acessível?\n');
    process.exit(1);
  }
}

testConnection();

/**
 * Script para configurar a base de dados PostgreSQL
 * Este script carrega os ficheiros SQL na base de dados da universidade
 */

const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Configuração da conexão
const pool = new Pool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  options: '-c search_path=bd054_schema,public',
});

// Função para executar um ficheiro SQL
async function executeSqlFile(filePath, description) {
  console.log(`\n📄 A executar: ${description}`);
  console.log(`   Ficheiro: ${path.basename(filePath)}`);

  try {
    const sql = fs.readFileSync(filePath, 'utf8');
    await pool.query(sql);
    console.log(`✅ ${description} - Concluído com sucesso!`);
    return true;
  } catch (error) {
    console.error(`❌ Erro ao executar ${description}:`);
    console.error(`   ${error.message}`);
    return false;
  }
}

// Função principal
async function setupDatabase() {
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║     CONFIGURAÇÃO DA BASE DE DADOS - PROJETO BD054          ║');
  console.log('╚════════════════════════════════════════════════════════════╝');

  try {
    // Testar conexão
    console.log('\n🔌 A testar conexão com a base de dados...');
    const client = await pool.connect();
    console.log('✅ Conexão estabelecida com sucesso!');
    console.log(`   Host: ${process.env.DB_HOST}`);
    console.log(`   Database: ${process.env.DB_NAME}`);
    console.log(`   User: ${process.env.DB_USER}`);
    client.release();

    // Caminhos dos ficheiros SQL
    const databasePath = path.join(__dirname, '../../../database');
    const sqlFiles = [
      {
        path: path.join(databasePath, 'schema.sql'),
        description: 'Schema (Tabelas, Chaves Primárias e Estrangeiras)'
      },
      {
        path: path.join(databasePath, 'triggers.sql'),
        description: 'Triggers'
      },
      {
        path: path.join(databasePath, 'procedures.sql'),
        description: 'Procedures, Funções e Views'
      },
      {
        path: path.join(databasePath, 'data.sql'),
        description: 'Dados (Inserção de registos)'
      }
    ];

    // Executar cada ficheiro
    console.log('\n📋 A carregar ficheiros SQL...');
    let allSuccess = true;

    for (const file of sqlFiles) {
      if (fs.existsSync(file.path)) {
        const success = await executeSqlFile(file.path, file.description);
        if (!success) allSuccess = false;
      } else {
        console.log(`⚠️  Ficheiro não encontrado: ${path.basename(file.path)}`);
      }
    }

    console.log('\n' + '═'.repeat(60));
    if (allSuccess) {
      console.log('✅ BASE DE DADOS CONFIGURADA COM SUCESSO!');
      console.log('\n💡 Próximos passos:');
      console.log('   1. Execute: npm run dev (para iniciar o servidor)');
      console.log('   2. O servidor estará disponível em: http://localhost:5000');
    } else {
      console.log('⚠️  CONFIGURAÇÃO CONCLUÍDA COM AVISOS');
      console.log('   Alguns ficheiros podem ter falhado. Verifique os erros acima.');
    }
    console.log('═'.repeat(60));

  } catch (error) {
    console.error('\n❌ ERRO FATAL:');
    console.error('   ', error.message);
    console.log('\n💡 Verificações:');
    console.log('   1. Está conectado à VPN da universidade?');
    console.log('   2. As credenciais no ficheiro .env estão corretas?');
    console.log('   3. O servidor PostgreSQL está acessível?');
    process.exit(1);
  } finally {
    await pool.end();
  }
}

// Executar
setupDatabase();

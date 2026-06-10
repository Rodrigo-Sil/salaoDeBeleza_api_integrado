require('dotenv').config();
const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

let pool;

async function executarSQL(arquivo, conexao){
  const sql = fs.readFileSync(arquivo, 'utf-8');
  await conexao.query(sql);
}

async function iniciarBanco(){
  const conexao = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    multipleStatements: true
  })

  const criarPath = path.join(__dirname, "database/create_database.sql");
  const seedPath = path.join(__dirname, "database/seed_database.sql");

  await executarSQL(criarPath, conexao);
  await conexao.end();

  pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    multipleStatements: true
  });

  await executarSQL(seedPath, pool);

  console.log("Banco e dados prontos");
}

const iniciar = iniciarBanco();

module.exports = {
  query: async (sql, params) => {
    await iniciar;
    return pool.query(sql, params);
  }
};
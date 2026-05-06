const { Client } = require('pg');
const { MongoClient } = require('mongodb');

// configurar as variáveis no arquivo .env
const pgUrl = `postgresql://${process.env.USER_PG}:${process.env.PASSWORD_PG}@${process.env.HOST_PG}:${process.env.PORT_PG}/${process.env.DATABASE_PG}`;

const mongoUri = process.env.MONGO_URI;

// instâncias da conexão com os bancos de dados postgreSQL e MongoDB
const pgClient = new Client({ connectionString: pgUrl });
const mongoClient = new MongoClient(mongoUri);

module.exports = {
  pgClient,
  mongoClient
};
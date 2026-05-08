const { pgClient } = require('../database');
const { createTables } = require('./createTables');
const { createProcedures } = require('./createProcedures');
const { mockTablesDimention, mockTablesFact } = require('./mockTables');

// Função para criar as tabelas e mockar os dados
async function mockPostgres() {
  try {
    const pg = await pgClient.connect();
    await pg.query(createTables);
    await pg.query(createProcedures);
    await pg.query(mockTablesDimention);
    await pg.query(mockTablesFact);
    console.log('tabelas criadas e registros mockados')
    
  } catch (error) {
    console.error('Erro ao criar e mockar o banco de dados:', error);
  } finally {
    pgClient.end();
  } 
}

mockPostgres();
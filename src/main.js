const { pgClient, mongoClient } = require('./database');
const { sqlQueryClientes, sqlQueryAdicionais, sqlQueryAcais, sqlQueryPedidos } = require('./queries');
const { clienteDocument, adicionalDocument, acaiDocument, pedidoDocument } = require('./documents');

async function migrateTable(tableName, sqlQuery, documentObject, mongoDb) {
  const collection = mongoDb.collection(tableName);

  // Verificar se os registros já foram migrados
  const documentosRegistrados = await collection.countDocuments();
  if (documentosRegistrados > 0) {
    console.log(`Os registros de "${tableName}" já foram migrados.`);
    return;
  }

  // Extrair os dados da tabela relacional
  const registro = await pgClient.query(sqlQuery);
  const documentos = registro.rows.map(row => documentObject(row));
  console.log(`${documentos.length} registros de ${tableName} extraídos`);

  // Verificar se há registros para migrar
  if (documentos.length === 0) {
    console.log(`Nenhum registro encontrado em ${tableName}.`);
    return;
  }

  // Inserir os documentos no MongoDB
  await collection.insertMany(documentos);
  console.log(`Sucesso: ${documentos.length} registros de ${tableName} migrados.`);
}

async function main() {
  try {
    await pgClient.connect();
    await mongoClient.connect();

    const nosqlDb = mongoClient.db('projeto-acaiteria');

    // Migrar os dados de cada tabela
    await migrateTable('clientes', sqlQueryClientes, clienteDocument, nosqlDb);
    await migrateTable('adicionais', sqlQueryAdicionais, adicionalDocument, nosqlDb);
    await migrateTable('acais', sqlQueryAcais, acaiDocument, nosqlDb);
    await migrateTable('pedidos', sqlQueryPedidos, pedidoDocument, nosqlDb);
    
  } catch (err) {
    console.error('Erro ao migrar os dados:', err);
  } finally {
    await pgClient.end();
    await mongoClient.close();
  }
}

main();
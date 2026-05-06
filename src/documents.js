function clienteDocument(row) {
  return {
    _id: row.id,
    nome: row.nome,
    login: row.login,
    senha: row.senha
  };
}

function adicionalDocument(row) {
  return {
    _id: row.id,
    nome: row.nome
  };
}

function acaiDocument(row) {
  return {
    _id: row.id,
    nome: row.nome,
    disponivel: row.disponivel,
    tamanho_p: row.tamanho_p,
    tamanho_m: row.tamanho_m,
    tamanho_g: row.tamanho_g,
    adicionais: row.adicionais
  }
}

function pedidoDocument(row) {
  return {
    _id: row.id,
    clienteNome: row.nome,
    itens: row.itens,
    total: row.total
  }
}

module.exports = { 
  clienteDocument,
  adicionalDocument,
  acaiDocument,
  pedidoDocument
};
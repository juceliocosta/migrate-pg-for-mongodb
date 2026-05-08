const createTables = `
CREATE TABLE IF NOT EXISTS adicionais (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS acais (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  disponivel BOOLEAN DEFAULT true,
  tamanho_p DECIMAL(4, 2), 
  tamanho_m DECIMAL(4, 2),
  tamanho_g DECIMAL(4, 2)
);

CREATE TABLE IF NOT EXISTS acai_adicionais (
  PRIMARY KEY (acai_id, adicional_id),
  acai_id INTEGER REFERENCES acais(id) ON DELETE CASCADE,
  adicional_id INTEGER REFERENCES adicionais(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS clientes (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100),
  login VARCHAR(100) UNIQUE NOT NULL,
  senha VARCHAR(100) NOT NULL 
);

CREATE TABLE IF NOT EXISTS pedidos (
  id SERIAL PRIMARY KEY,
  acai_id INTEGER REFERENCES acais(id),
  cliente_id INTEGER REFERENCES clientes(id),
  quantidade INTEGER NOT NULL,
  tamanho VARCHAR(1) NOT NULL,
  valor_total DECIMAL(4, 2)
);

`;

module.exports = { createTables };
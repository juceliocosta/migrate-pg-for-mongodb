// separei as queries em tabelas dimenção e tabela fatos
// porque a segunda depende da primeira já populada

const mockTablesDimention = `
INSERT INTO adicionais (nome) 
VALUES
('Leite Condensado'),('Granola'),
('Paçoca'),('Leite em pó'),
('Banana'),('Morango'),
('Chocolate'),('Amendoim'),
('Mel'),('Coco ralado');


INSERT INTO clientes (nome, login, senha) 
VALUES 
('Santos', 'Santos10' , 'criptografadosenha123'),
('Maria Silva', 'maria.s', 'criptografado123456'),
('João Pedro', 'joaopedro', 'criptografadoabc123');


INSERT INTO acais (nome, disponivel, tamanho_p, tamanho_m, tamanho_g) 
VALUES
('Açaí Tradicional', true, 10.99, 16.99, 22.99),
('Açaí Mix', true, 12.99, 18.99, 24.99),
('Açaí Kids', true, 15.99, 21.99, 27.99),
('Açaí Caipira', true, 14.99, 20.99, 26.99),
('Açaí Tropical', false, 17.99, 23.99, 29.99);
`;

const mockTablesFact = `
INSERT INTO acai_adicionais (acai_id, adicional_id) VALUES 
(1,1),(1,2),(1,3),
(2,2),(2,3),(2,6),
(3,1),(3,4),(3,7),(3,8),
(4,1),(4,6),(4,7),(4,9),
(5,1),(5,2),(5,4),(5,8),(5,10);


CALL inserir_pedido(1, 2, 2, 'P');
CALL inserir_pedido(1, 3, 1, 'M');
CALL inserir_pedido(2, 4, 1, 'G');
CALL inserir_pedido(3, 1, 1, 'M');
CALL inserir_pedido(3, 2, 2, 'P');
`;

module.exports = { mockTablesDimention, mockTablesFact };
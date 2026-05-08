const createProcedures = `
CREATE OR REPLACE PROCEDURE inserir_pedido(
  p_cliente_id INT,
  p_acai_id INT,
  p_quantidade INT,
  p_tamanho VARCHAR(1)  
)
LANGUAGE plpgsql
AS $$
DECLARE
  preco_base NUMERIC;
BEGIN
  IF p_tamanho = 'P' THEN
    SELECT tamanho_p INTO preco_base FROM acais WHERE id = p_acai_id;
  ELSIF p_tamanho = 'M' THEN
    SELECT tamanho_m INTO preco_base FROM acais WHERE id = p_acai_id;
  ELSIF p_tamanho = 'G' THEN
    SELECT tamanho_g INTO preco_base FROM acais WHERE id = p_acai_id;
  ELSE
    RAISE EXCEPTION 'Tamanho inválido. Use P, M ou G.';
  END IF;

  INSERT INTO pedidos (cliente_id, acai_id, quantidade, tamanho, valor_total)
  VALUES (p_cliente_id, p_acai_id, p_quantidade, p_tamanho, preco_base * p_quantidade);

  RAISE NOTICE 'Pedido inserido: Cliente %, Açaí %, Tamanho %, Quantidade %, Valor Total %',
    p_cliente_id, p_acai_id, p_tamanho, p_quantidade, preco_base * p_quantidade;
END;
$$;



CREATE OR REPLACE PROCEDURE preco_acai(
  acai_id INTEGER,
  tamanho TEXT
)
LANGUAGE plpgsql
AS $$
DECLARE
  preco NUMERIC;
  nome_acai TEXT;
BEGIN
  SELECT nome INTO nome_acai
  FROM acais
  WHERE id = acai_id;

  IF tamanho = 'P' THEN
    SELECT tamanho_p INTO preco FROM acais WHERE id = acai_id;
  ELSIF tamanho = 'M' THEN
    SELECT tamanho_m INTO preco FROM acais WHERE id = acai_id;
  ELSIF tamanho = 'G' THEN
    SELECT tamanho_g INTO preco FROM acais WHERE id = acai_id;
  END IF;

  RAISE NOTICE 'Preço do açaí % tamanho %: R$ %', nome_acai, tamanho, preco;
END;
$$;
`;

module.exports = { createProcedures };
const sqlQueryClientes = `SELECT * FROM clientes`;

const sqlQueryAdicionais = `SELECT * FROM adicionais`;

const sqlQueryAcais = `
  SELECT 
    a.id, a.nome, a.disponivel, 
    a.tamanho_p, a.tamanho_m, a.tamanho_g,
    json_agg(ad.nome) FILTER (WHERE ad.nome IS NOT NULL) AS adicionais
  FROM acais as a
  LEFT JOIN acai_adicionais as aad
    ON a.id = aad.acai_id
  LEFT JOIN adicionais as ad
    ON aad.adicional_id = ad.id
  GROUP BY a.id
`;

const sqlItemObjeto = `
  'pedido_id', p.id,
  'nome', a.nome,
  'quantidade', p.quantidade,
  'tamanho', json_build_object(
    'sigla', p.tamanho,
    'valor', (
      CASE 
        WHEN p.tamanho = 'P' THEN a.tamanho_p
        WHEN p.tamanho = 'M' THEN a.tamanho_m
        WHEN p.tamanho = 'G' THEN a.tamanho_g
      END
    )
  ),
  'adicionais', COALESCE(ads.lista, '[]'::json),
  'valor_total_pedido', p.valor_total
`;

const sqlQueryPedidos = `
  SELECT 
    c.id, c.nome,
    json_agg(
      json_build_object(${sqlItemObjeto})
    ) AS itens,
    SUM(p.valor_total) AS total
  FROM clientes c
  JOIN pedidos p ON c.id = p.cliente_id
  JOIN acais a ON p.acai_id = a.id
  LEFT JOIN (
    SELECT 
      acad.acai_id, 
      json_agg(ad.nome) AS lista
    FROM acai_adicionais acad
    JOIN adicionais ad ON acad.adicional_id = ad.id
    GROUP BY acad.acai_id
  ) ads ON a.id = ads.acai_id
  GROUP BY c.id, c.nome;
`;

module.exports = { 
  sqlQueryAcais, 
  sqlQueryAdicionais, 
  sqlQueryClientes, 
  sqlQueryPedidos 
};
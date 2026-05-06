# Migração de banco de dados Postgres para o MongoDB

## Formato das tabelas convertidas em Documentos

### Exemplo de documento `clientes`

```json
{
  "_id": 1,
  "nome": "joao",
  "login": "joaodasilva",
  "senha": "senha123"
}
```

### Exemplo de documento `adicionais`

```json
{
  "_id": 1,
  "nome": "morango"
}
```

### Exemplo de documento `acais`

```json
{
  "_id": 1,
  "nome": "tradicional",
  "disponivel": true,
  "tamanho_p": 8.99,
  "tamanho_m": 14.99,
  "tamanho_g": 19.99,
  "adicionais": ["leite condensado", "granola", "paçoca"]
}
```

### Exemplo de documento `pedidos`

```json
{
  "_id": 1,
  "clienteNome": "joao",
  "itens": [
    {
      "pedido_id": 1,
      "nome": "mixer",
      "quantidade": 2,
      "tamanho": {"sigla": "P", "valor": 8.99},
      "adicionais": ["morango", "paçoca", "confetes"],
      "valor_total_pedido": 17.98
    }
  ],
  "total": 17.98
}
```
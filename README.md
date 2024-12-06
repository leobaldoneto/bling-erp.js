# bling-erp.js
Biblioteca para interagir com o Bling ERP API.

Não recomendo usar essa lib, pois está na versão v2 da API do Bling, que está descontinuada.

Outra opção de lib em typescript: https://github.com/AlexandreBellas/bling-erp-api-js?tab=readme-ov-file

## Recursos
- Produtos: add, update, delete, getAll, getBySku
- Pedidos: add, update, getAll, getByNumber
- Pedidos de Compras: add, update, getAll, getByNumber
- Contatos: add, update, getAll, getById
- Categorias: getAll
- Paginação automática
- Filtros

## Exemplos

Crie uma instância:
```js
const bling = new Bling({
    apikey: apikey,
})
```

Buscar produto pelo SKU:
```js
async function buscarProdutoPeloSKU () {
  return await bling.produtos.getBySku( sku )
}
```


Abra um Issue para tirar dúvidas.
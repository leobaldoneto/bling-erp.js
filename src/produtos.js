'use strict';
const xmlbuilder = require('xmlbuilder2');

/*
add - testar
update - testar
delete - testar
getall - testar
getbysku - testar
getbyprovidersku 
*/

module.exports = class Pedidos {
  constructor(client) {
    this.bling = client;
  }

  // Recebe um objeto pedido e retorna o pedido cadastrado.
  async add(productObject) {
    let productXML = xmlbuilder.create(productObject).toString();
    let params = {
      xml: productXML,
    };

    let config = {
      method: 'post',
      url: 'produto/json/',
      params,
    };
    return this.bling.request(config);
  }

  // Atualiza o informações do produto
  async update(productSku, productObject) {
    let productXML = xmlbuilder.create(productObject).toString();
    let params = {
      xml: productXML,
    };
    let config = {
      method: 'post',
      url: `produto/${productSku}/json`,
      params,
    };
    return this.bling.request(config);
  }

  /* Retorna todos os produtos, no máximo 100 por página.
    Para implementar:
      - utilizar parametros opcionais da api para receber imagem, informações de estoques e lojas especificas
      - adicionar parametro para limitar o número de pedidos que deve ser retornado.
      - padronizar os filtros em objetos
      - utilizar filtros
  */
  async getAll(filters = '') {
    let params = {};

    if (filters !== '') {
      params.filters = filters;
    }

    let config = {
      method: 'get',
      url: 'produtos/json/',
      params,
    };

    return this.bling.request(config);
  }

  /*  Retorna pedido através do id do pedido.
      Implementar:
      - opção para usar o parametro de histórico do pedido da API do Bling.
      - Utilizar outros parâmetros
  */
  async getBySku(productSku) {
    let config = {
      method: 'get',
      url: `produto/${productSku}/json/`,
    };
    return this.bling.request(config);
  }

  // Deleta um produto pelo SKU
  async delete(productSku) {
    let config = {
      method: 'delete',
      url: `produto/${productSku}/json/`,
    };
    return this.bling.request(config);
  }
};

'use strict';
const xmlbuilder = require('xmlbuilder2');

module.exports = class Pedidos {
  constructor(client) {
    this.bling = client;
  }

  // Recebe um objeto Peddido de Compra e retorna o pedido de compra cadastrado.
  async add(buyOrderObject) {
    let buyOrderXML = xmlbuilder.create(buyOrderObject).toString();
    let params = {
      xml: buyOrderXML,
    };

    let config = {
      method: 'post',
      url: 'pedidocompra/json/',
      params,
    };
    return this.bling.request(config);
  }

  // Atualizar a situação de um pedido de compra
  async update(buyOrderNumber, buyOrderStateObject) {
    let buyOrderXML = xmlbuilder.create(buyOrderStateObject).toString();
    let params = {
      xml: buyOrderXML,
    };
    let config = {
      method: 'put',
      url: `pedidocompra/${buyOrderNumber}/json`,
      params,
    };
    return this.bling.request(config);
  }

  /* Retorna todos os pedidos de compra, no máximo 100 por página.
    Para implementar:
      - adicionar parametro para limitar o número de pedidos que deve ser retornado.
      - padronizar os filtros em objetos
  */
  async getAll(filters = '') {
    let params = {};

    if (filters !== '') {
      params.filters = filters;
    }

    let config = {
      method: 'get',
      url: 'pedidoscompra/json/',
      params,
    };

    return this.bling.request(config);
  }

  //  Retorna pedido de compra através do número do pedido.
  async getByNumber(buyOrderNumber) {
    let config = {
      method: 'get',
      url: `pedidocompra/${buyOrderNumber}/json/`,
    };
    return this.bling.request(config);
  }
};

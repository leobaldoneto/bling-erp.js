'use strict';
const xmlbuilder = require('xmlbuilder2');

module.exports = class Pedidos {
  constructor(client) {
    this.bling = client;
  }

  // Recebe um objeto pedido e retorna o pedido cadastrado.
  async add(orderObject, notafiscal = false) {
    let orderXML = xmlbuilder.create(orderObject).toString();
    let params = {
      xml: orderXML,
    };

    if (notafiscal === true) {
      params.gerarnfe = 'true';
    }

    let config = {
      method: 'post',
      url: 'pedido/json/',
      params,
    };
    return this.bling.request(config);
  }

  // Atualizar a situação de um pedido
  async update(orderNumber, orderStateObject) {
    let orderXML = xmlbuilder.create(orderStateObject).toString();
    let params = {
      xml: orderXML,
    };
    let config = {
      method: 'put',
      url: `pedido/${orderNumber}/json`,
      params,
    };
    return this.bling.request(config);
  }

  /* Retorna todos os produtos, no máximo 100 por página.
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
      url: 'pedidos/json/',
      params,
    };

    return this.bling.request(config);
  }

  /*  Retorna pedido através do id do pedido.
      Implementar:
      - opção para usar o parametro de histórico do pedido da API do Bling.
  */
  async getByNumber(orderNumber) {
    let config = {
      method: 'get',
      url: `pedido/${orderNumber}/json/`,
    };
    return this.bling.request(config);
  }
};

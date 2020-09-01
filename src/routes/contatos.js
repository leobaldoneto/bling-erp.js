'use strict';
const xmlbuilder = require('xmlbuilder2');

/*
add - testar
update - testar
getall - testar
getbyid - testar
*/

module.exports = class Pedidos {
  constructor(client) {
    this.bling = client;
  }

  // Recebe um objeto Contato e retorna o contato cadastrado.
  async add(contactObject) {
    let contactXML = xmlbuilder.create(contactObject).toString();
    let params = {
      xml: contactXML,
    };

    let config = {
      method: 'post',
      url: 'contato/json/',
      params,
    };
    return this.bling.request(config);
  }

  // Atualiza o informações de um contato
  async update(contactId, contactObject) {
    let contactXML = xmlbuilder.create(contactObject).toString();
    let params = {
      xml: contactXML,
    };
    let config = {
      method: 'put',
      url: `contato/${contactId}/json`,
      params,
    };
    return this.bling.request(config);
  }

  /* Retorna todos os contatos, no máximo 100 por página.
    Para implementar:
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
      url: 'contatos/json/',
      params,
    };

    return this.bling.request(config);
  }

  /*  Retorna um contato através do id.
      identifierType: 1 => CPF ou CNPF (integer); 2 => ID (integer)
  */
  async getById(contactIdentifier, identifierType = 1) {
    let params = {
      identificador: identifierType,
    };

    let config = {
      method: 'get',
      url: `contato/${contactIdentifier}/json/`,
      params,
    };
    return this.bling.request(config);
  }
};

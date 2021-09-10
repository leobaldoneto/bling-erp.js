'use strict';
const xmlbuilder = require('xmlbuilder2');

/*
add - 
update - 
getall - ok
getbyid - 
*/

module.exports = class Categorias {
  constructor(client) {
    this.bling = client;
  }

  async getAll() {
    let config = {
      method: 'get',
      url: 'categorias/json/',
    };
    return this.bling.request(config);
  }
};

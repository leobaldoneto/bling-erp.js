'use strict';
const axios = require('axios');

const Pedidos = require('./pedidos');
const Produtos = require('./produtos');
const Contatos = require('./contatos');

class Bling {
  constructor(...args) {
    this.axiosInstance = new axios.create({
      baseURL: 'https://bling.com.br/Api/v2/',
      timeout: 5000,
      params: {
        apikey: args[0].apikey,
      },
    });

    this.pedidos = new Pedidos(this);
    this.produtos = new Produtos(this);
    this.contatos = new Contatos(this);
  }

  request(options) {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .request(options)
        .then(function (response) {
          let retorno = response.data.retorno;
          if (retorno.erros) {
            reject(new Error(retorno.erros[0].erro.msg));
          }
          resolve(retorno);
        })
        .catch(function (error) {
          reject(new Error(error.message));
        });
    });
  }
}

module.exports = Bling;
module.exports.config = (config) => {
  return new Bling(config);
};

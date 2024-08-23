'use strict';
const axios = require('axios');

const Pedidos = require('./routes/pedidos');
const Produtos = require('./routes/produtos');
const Contatos = require('./routes/contatos');
const PedidosCompra = require('./routes/pedidos-compra');
const Categorias = require('./routes/categorias');

class Bling {
  constructor(config) {
    this.axiosInstance = new axios.create({
      baseURL: 'https://bling.com.br/Api/v2/',
      timeout: 5000,
      params: {
        apikey: config.apikey,
      },
    });

    this.requestDelay = config.requestDelay || 0; // Default delay is 0 ms

    this.pedidos = new Pedidos(this);
    this.produtos = new Produtos(this);
    this.contatos = new Contatos(this);
    this.pedidosCompra = new PedidosCompra(this);
    this.categorias = new Categorias(this);
  }

  // Helper function to introduce delay
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Esse bloco executa a requisição ao servidor do Bling.
  async request(config, itensLimit = 100, instance = this) {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .request(config)
        .then(async function (response) {
          let retorno = response.data.retorno;
          if (retorno.erros) {
            if (retorno.erros[0].erro.cod == 14){
              resolve([]); // retorna vazio quando não encontrar outra página.
            }
            reject(new Error(retorno.erros[0].erro.msg));
          }
          // Implementar: paginação das chamadas com retorno acima de 100 itens.
          let objectKey = Object.keys(retorno)[0]; // Chave da chamada
          let itensArray = retorno[objectKey]; // Itens retornados
          // Adicionar o número da página
          // Verifica se ainda deve mudar de página
          if (
            itensLimit > itensArray.length &&
            retorno[objectKey].length == 100
          ) {
            let url = response.config.url.split('/'); // Quebra a url
            let page = url[1].split('=')[1]; // Número da página atual
            let newConfig = response.config; // Captura a configuração do request do Axios
            newConfig.url = `${url[0]}/page=${++page}/${url[2]}/`; // Prepara a url da próxima página

            await instance.sleep(instance.requestDelay); // Introduce delay

            let novoRetorno = await instance.request(
              newConfig,
              itensLimit - 100
            ); // solicita e retorna a próxima página
            if(novoRetorno[objectKey]){
              retorno[objectKey] = retorno[objectKey].concat(
              novoRetorno[objectKey]); // Unificar os Arrays
            }
            resolve(retorno); // Retorna o array na promise
          } else if (itensLimit !== 100) {
            retorno[objectKey] = retorno[objectKey].splice(0, itensLimit);
            resolve(retorno);
          } else {
            resolve(retorno); // Retorna esse quando não tiver mais páginas
          }
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
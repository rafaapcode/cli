const { readFile, writeFile } = require("fs");
const { promisify } = require("util");

const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);

class Database {
  constructor() {
    this.nome = "herois.json";
  }

  async obterDados() {
    const arquivo = await readFileAsync(this.nome, "utf8");
    return JSON.parse(arquivo.toString());
  }

  async escrever(heroi) {
    await writeFileAsync(this.nome, JSON.stringify(heroi));
    return true;
  }

  async cadastrar(heroi) {
    const dados = await this.obterDados();
    const id = heroi.id <= 2 ? heroi.id : Date.now();
    const heroiComId = {
      id,
      ...heroi,
    };
    const dadosFinais = [...dados, heroiComId];

    const resultado = await this.escrever(dadosFinais);
    return resultado;
  }

  async listar(id) {
    const dados = await this.obterDados();
    const dadosFiltrados = dados.filter((item) => (id ? item.id === id : true));
    return dadosFiltrados;
  }

  async remover(id) {
    if (!id) {
      return await this.escrever([]);
    }
    const dados = await this.obterDados();
    const index = dados.findIndex((item) => item.id === parseInt(id));
    if (index === -1) {
      throw Error("O héroi não existe");
    }
    dados.splice(index, 1);
    return await this.escrever(dados);
  }

  async atualizar(id, data) {
    const dados = await this.obterDados();
    const index = dados.findIndex((item) => item.id === parseInt(id));
    if (index === -1) {
      throw Error("O héroi não existe");
    }
    const atual = dados[index];
    const objAtualizar = { ...atual, ...data };
    dados.splice(index, 1, objAtualizar);
    return await this.escrever(dados);
  }
}

module.exports = new Database();

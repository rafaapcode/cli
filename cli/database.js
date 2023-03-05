const { readFile } = require("fs");
const { promisify } = require("util");

const readFileAsync = promisify(readFile);

class Database {
  constructor() {
    this.nome = "herois.json";
  }

  async obterDados() {
    const arquivo = await readFileAsync(this.nome, "utf8");
    return JSON.parse(arquivo.toString());
  }

  escrever() {}

  async listar(id) {
    const dados = await this.obterDados();
    const dadosFiltrados = dados.filter((item) => (id ? item.id === id : true));
    return dadosFiltrados;
  }
}

module.exports = new Database();

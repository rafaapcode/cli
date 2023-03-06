const { deepEqual, ok } = require("assert");
const database = require("./database.js");

const DEFAULT_CADASTRAR = {
  nome: "Hulk",
  poder: "Super-Força",
  id: 1,
};

const DEFAULT_ATUALIZAR = {
  nome: "Flash",
  poder: "Super-Velocidade",
  id: 2,
};

describe("Suite de manipulação de Heróis", () => {
  before(async () => {
    await database.escrever([]);
  })
  
  before(async () => {
    await database.cadastrar(DEFAULT_CADASTRAR);
    await database.cadastrar(DEFAULT_ATUALIZAR);
  });
 
  it("Deve pesquisar um herói", async () => {
    const expected = DEFAULT_CADASTRAR;
    const [resultado] = await database.listar(expected.id);
    deepEqual(resultado, expected);
  });
  it("Deve cadastrar um herói", async () => {
    const expected = DEFAULT_CADASTRAR;
    await database.cadastrar(DEFAULT_CADASTRAR);
    const [atual] = await database.listar(DEFAULT_CADASTRAR.id);
    deepEqual(atual, expected);
  });
  it("Deve remover um herói por id", async () => {
    const expected = true;
    const resultado = await database.remover(DEFAULT_CADASTRAR.id);
    deepEqual(resultado, expected);
  });
  it("Deve atualizar um herói por id", async () => {
    const expected = {
      ...DEFAULT_ATUALIZAR,
      nome: "Batman",
      poder: "Dinheiro",
    };
    const novoDado = { nome: "Batman", poder: "Dinheiro" };
    await database.atualizar(DEFAULT_ATUALIZAR.id, novoDado);
    const resultado =  await database.listar(DEFAULT_ATUALIZAR.id)
    deepEqual(resultado[0], expected);
  });
});

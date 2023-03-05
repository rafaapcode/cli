const { deepEqual, ok } = require("assert");
const database = require("./database.js");

const DEFAULT_CADASTRAR = {
  nome: "Hulk",
  poder: "Super-Força",
  id: 1,
};

describe("Suite de manipulação de Heróis", () => {
    before(async () => {
        await database.cadastrar(DEFAULT_CADASTRAR);
    })
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
});

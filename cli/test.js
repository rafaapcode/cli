const { deepEqual, ok } = require("assert");
const database = require("./database.js");

const DEFAULT_CADASTRAR = {
    nome: 'Hulk',
    poder: 'Super-Força',
    id: 1
}

describe('Suite de manipulação de Heróis', () => {
    it('Deve pesquisar um herói', async () => {
        const expected = DEFAULT_CADASTRAR;
        const [resultado] = await database.listar(expected.id);
        deepEqual(resultado, expected);
    })
    // it('Deve cadastrar um herói', async () => {
    //     const expected = DEFAULT_CADASTRAR;

    //     ok(null, expected);
    // })
})
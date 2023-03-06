const Commander = require("commander");
const Database = require("./database");
const Heroi = require("./heroi");

async function main() {
  Commander.version("1.0.0")
    .option("-n, --nome [value]", "Nome do Heroi")
    .option("-p, --poder [value]", " Poder do Heroi")
    .option("-i, --id [value]", "ID do Heroi")

    .option("-c, --cadastrar", "Cadastrar um Heroi")
    .option("-la, --listarTodos", "Listar todos Heroi")
    .option("-l, --listar [value]", "Listar um Heroi")
    .option("-r, --remover", "Remover Heroi pelo ID")
    .option("-a, --atualizar [value]", "Atualizar um Heroi pelo ID")
    .parse(process.argv);
  const heroi = new Heroi(Commander._optionValues);
  try {
    if (Commander._optionValues.cadastrar) {
      Reflect.deleteProperty(heroi, "id");
      const resultado = await Database.cadastrar(heroi);
      if (!resultado) {
        console.error("Herói não foi cadastrado");
        return;
      }
      console.log("Heroi cadastrado com sucesso");
    }
    if (Commander._optionValues.listarTodos) {
      const resultado = await Database.listar();
      console.log(resultado);
    }

    if (Commander._optionValues.listar) {
      const id = parseInt(Commander._optionValues.listar);
      const resultado = await Database.listar(id);
      console.log(resultado);
    }

    if (Commander._optionValues.remover) {
      const resultado = await Database.remover(heroi.id);
      if (!resultado) {
        console.error("Herói não foi possível remover o héroi");
        return;
      }
      console.log("Heroi removido com sucesso");
    }

    if (Commander._optionValues.atualizar) {
      const idParaAtualizar = parseInt(Commander._optionValues.atualizar);
      // Remover chaves undefined ou null
      const dado = JSON.stringify(heroi);
      const heroiAtualizar = JSON.parse(dado);
      const resultado = await Database.atualizar(
        idParaAtualizar,
        heroiAtualizar
      );
      if (!resultado) {
        console.error("Não foi possível atualizar o herói");
        return;
      }
      console.log("Heroi atualizado com sucesso");
    }
  } catch (error) {
    console.error(error);
  }
}

main();

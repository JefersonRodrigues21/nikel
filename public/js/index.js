const nome = "Jeferson";
let nome2 = "";
let pessoaDefault = {
  //objeto.
  nome: "Jeferson Rodrigues",
  idade: "33",
  profissao: "Desenvolvedor",
};

let nomes = ["Jeferson Rodrigues", "João da Silva", "Maria da Silva"];

let pessoasListaVazia = [];

let pessoas = [
  {
    nome: "Jeferson Rodrigues",
    idade: "33",
    profissao: "Desenvolvedor",
  },
  {
    nome: "Maria da Silva",
    idade: "25",
    profissao: "UX/UI Designer",
  },
];

function alterarNome() {
  nome2 = "Dev.geekjs";
  console.log("Valor alterado: ");
  console.log(nome2);
}

function recebeEalteraNome(novoNome) {
  nome2 = novoNome;
  console.log("Valor alterado recebendo um nome:");
  console.log(nome2);
}

function imprimirPessoa(pessoa) {
  console.log("Nome:");
  console.log(pessoa.nome);

  console.log("Idade:");
  console.log(pessoa.idade);

  console.log("Profissão:");
  console.log(pessoa.profissao);
}

function adicionarPessoa(pessoa) {
  pessoas.push(pessoa);
}

function imprimirPessoas() {
  console.log("----------IMPRIMIR PESSOAS---------");
  pessoas.forEach((item) => {
    console.log("Nome:");
    console.log(item.nome);

    console.log("Idade:");
    console.log(item.idade);

    console.log("Profissão:");
    console.log(item.profissao);
  });
}

imprimirPessoas();

adicionarPessoa({
  nome: "João da Silva",
  idade: "14",
  profissao: "Jovem aprendiz",
});

imprimirPessoas();



// imprimirPessoa(pessoaDefault);

// imprimirPessoa({
//   nome: "Miguel",
//   idade: "25",
//   profissao: "Analista de Dados",
// });

// recebeEalteraNome("João da Silva");
// recebeEalteraNome("Maria da Silva");

// alterarNome();

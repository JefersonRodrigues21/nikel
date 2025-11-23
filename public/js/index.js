const nome = "Jeferson";
let nome2 = "";
let pessoa = {                     //objeto.
    nome: "Jeferson Rodrigues",
    idade: "33",
    profissao: "Desenvolvedor",
}

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

console.log(pessoa);

console.log("Nome:");
console.log(pessoa.nome);

console.log("Idade:");
console.log(pessoa.idade);

console.log("Profissão:");
console.log(pessoa.profissao);

// recebeEalteraNome("João da Silva");
// recebeEalteraNome("Maria da Silva");

// alterarNome();
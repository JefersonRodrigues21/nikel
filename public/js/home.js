const myModal = new bootstrap.Modal("#transaction-modal"); // Inicializa o modal de transação usando Bootstrap
let logged = sessionStorage.getItem("logged"); // Obtém o valor da sessão do usuário do sessionStorage
const session = localStorage.getItem("session"); // Obtém o valor da sessão do usuário do localStorage
let data = {
    transactions: []
};

document.getElementById("button-logout").addEventListener("click", logout); // Adiciona um evento de clique ao botão de logout)

//ADICIONAR LANÇAMENTO
document.getElementById("transaction-form").addEventListener("submit", function(e) {
    e.preventDefault(); // Impede o envio padrão do formulário e manter a página atual

    const value = parseFloat(document.getElementById("value-input").value); // Pega o valor do campo de valor e converte para número
    const description = document.getElementById("description-input").value; // Pega o valor do campo de descrição
    const date = document.getElementById("date-input").value; // Pega o valor do campo de data
    const type = document.querySelector('input[name="type-input"]:checked').value; // Pega o valor do campo de tipo (entrada ou saída)

    data.transactions.unshift( {
        value: value, type: type, description: description, date: date // Adiciona a nova transação no início da lista de transações
    });

    saveData(data); // Salva os dados atualizados do usuário
    e.target.reset(); // Reseta o formulário de transação
    myModal.hide(); // Fecha o modal de transação
    
    alert("Lançamento adicionado com sucesso!");
});

checkLogged();

function checkLogged() { // Função para verificar se o usuário está logado
    if(session) {
        sessionStorage.setItem("logged", session); // Salva a sessão no sessionStorage do navegador
        logged = session; // Atualiza a variável logged com o valor da sessão
    }

    if(!logged) { // Se o usuário não estiver logado
        window.location.href = "index.html"; // Redireciona para a página index.html
        return;
    }

    const dataUser = localStorage.getItem(logged); // Obtém os dados do usuário do localStorage
    if(dataUser) {
        data = JSON.parse(dataUser); // Converte os dados do usuário de JSON para um objeto JavaScript
    }

    console.log(data); // Exibe os dados no console do navegador
}

function logout() {
    sessionStorage.removeItem("logged"); // Remove a sessão do usuário do sessionStorage
    localStorage.removeItem("session"); // Remove a sessão do usuário do localStorage

    window.location.href = "index.html"; // Redireciona para a página index.html
}

function saveData(data) { // Função para salvar os dados do usuário
    localStorage.setItem(data.login, JSON.stringify(data)); // Salva os dados no localStorage do navegador
}
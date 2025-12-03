const myModal = new bootstrap.Modal("#transaction-modal"); // Inicializa o modal de transação usando Bootstrap
let logged = sessionStorage.getItem("logged"); // Obtém o valor da sessão do usuário do sessionStorage
const session = localStorage.getItem("session"); // Obtém o valor da sessão do usuário do localStorage
// let cashIn = []; // Array para armazenar as entradas
// let cashOut = []; // Array para armazenar as saídas
let data = {
    transactions: []
};

document.getElementById("button-logout").addEventListener("click", logout); // Adiciona um evento de clique ao botão de logout)
checkLogged();

function logout() {
    sessionStorage.removeItem("logged"); // Remove a sessão do usuário do sessionStorage
    localStorage.removeItem("session"); // Remove a sessão do usuário do localStorage

    window.location.href = "index.html"; // Redireciona para a página index.html
}
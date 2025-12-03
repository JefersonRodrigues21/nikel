const myModal = new bootstrap.Modal("#transaction-modal"); // Inicializa o modal de transação usando Bootstrap
let logged = sessionStorage.getItem("logged"); // Obtém o valor da sessão do usuário do sessionStorage
const session = localStorage.getItem("session"); // Obtém o valor da sessão do usuário do localStorage
// let cashIn = []; // Array para armazenar as entradas
// let cashOut = []; // Array para armazenar as saídas
let data = {
    transactions: []
};

document.getElementById("button-logout").addEventListener("click", logout); // Adiciona um evento de clique ao botão de logout)
document.getElementById("transactions-button").addEventListener("click", function() { // Adiciona um evento de clique ao botão de ver todas as transações
    window.location.href = "transactions.html"; // Redireciona para a página de transações
})

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

    getCashIn(); // Atualiza a lista de entradas exibidas na página
    getCashOut(); // Atualiza a lista de saídas exibidas na página
    getTotal(); // Atualiza o saldo total exibido na página
    
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

    getCashIn(); // Chama a função para calcular o total de entradas
    getCashOut(); // Chama a função para calcular o total de saídas
    getTotal(); // Chama a função para calcular o saldo total
}

function logout() {
    sessionStorage.removeItem("logged"); // Remove a sessão do usuário do sessionStorage
    localStorage.removeItem("session"); // Remove a sessão do usuário do localStorage

    window.location.href = "index.html"; // Redireciona para a página index.html
}

function getCashIn() { // Função para calcular o total de entradas
    const transactions = data.transactions;// Obtém a lista de transações do usuário

    const cashIn = transactions.filter((item) => item.type === "1"); // Filtra as transações para obter apenas as entradas (type "1")

    
    if(cashIn.length) {
        let cashInHtml = ``; // Inicializa uma string vazia para armazenar o HTML das entradas
        let limit = 0; // Inicializa um contador para limitar o número de entradas exibidas

        if(cashIn.length > 5) {
            limit = 5; // Define o limite para 5 se houver mais de 5 entradas
        } else {
            limit = cashIn.length; // Define o limite para o número total de entradas disponíveis
        }

        for (let index = 0; index < limit; index++) { // Loop para iterar sobre as entradas até o limite definido
            cashInHtml += `
            <div class="row mb-4">
                <div class="col-12">
                    <h3 class="fs-2">R$ ${cashIn[index].value.toFixed(2)}</h3>
                    <div class="container p-0">
                        <div class="row">
                            <div class="col-12 col-md-8">
                              <p>${cashIn[index].description}</p>
                            </div>
                            <div class="col-12 col-md-3 d-flex justify-content-end">
                              ${cashIn[index].date}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `; // Adiciona o HTML da entrada atual à string cashInHtml
        }

        document.getElementById("cash-in-list").innerHTML = cashInHtml; // Atualiza o conteúdo HTML do elemento com id "cash-in-list" com as entradas geradas
    }
}

function getCashOut() { // Função para calcular o total de entradas
    const transactions = data.transactions;// Obtém a lista de transações do usuário

    const cashIn = transactions.filter((item) => item.type === "2"); // Filtra as transações para obter apenas as entradas (type "1")

    
    if(cashIn.length) {
        let cashInHtml = ``; // Inicializa uma string vazia para armazenar o HTML das entradas
        let limit = 0; // Inicializa um contador para limitar o número de entradas exibidas

        if(cashIn.length > 5) {
            limit = 5; // Define o limite para 5 se houver mais de 5 entradas
        } else {
            limit = cashIn.length; // Define o limite para o número total de entradas disponíveis
        }

        for (let index = 0; index < limit; index++) { // Loop para iterar sobre as entradas até o limite definido
            cashInHtml += `
            <div class="row mb-4">
                <div class="col-12">
                    <h3 class="fs-2">R$ ${cashIn[index].value.toFixed(2)}</h3>
                    <div class="container p-0">
                        <div class="row">
                            <div class="col-12 col-md-8">
                              <p>${cashIn[index].description}</p>
                            </div>
                            <div class="col-12 col-md-3 d-flex justify-content-end">
                              ${cashIn[index].date}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `; // Adiciona o HTML da entrada atual à string cashInHtml
        }

        document.getElementById("cash-out-list").innerHTML = cashInHtml;

        // document.getElementById("cash-out-list").innerHTML = cashInHtml; // Atualiza o conteúdo HTML do elemento com id "cash-in-list" com as entradas geradas                                                                          
    }
}

function getTotal(){ // Função para calcular o saldo total
    const transactions = data.transactions; // Obtém a lista de transações do usuário
    let total = 0; // Inicializa o total como 0

    transactions.forEach((item) => { // Itera sobre cada transação
        if(item.type === "1") { // Se for uma entrada (type "1")
            total += item.value; // Adiciona o valor ao total
        } else {
            total -= item.value; // Se for uma saída (type "2"), subtrai o valor do total
        }
    });

    document.getElementById("total").innerHTML = `R$ ${total.toFixed(2)}`; // Atualiza o conteúdo HTML do elemento com id "total" com o saldo total formatado
}

function saveData(data) { // Função para salvar os dados do usuário
    localStorage.setItem(data.login, JSON.stringify(data)); // Salva os dados no localStorage do navegador
}
const myModal = new bootstrap.Modal("#register-modal"); // Inicializa o modal de registro usando Bootstrap
let logged = sessionStorage.getItem("logged"); // Obtém o valor da sessão do usuário do sessionStorage
const session = localStorage.getItem("session"); // Obtém o valor da sessão do usuário do localStorage

checkLogged(); // Verifica se o usuário está logado

//LOGAR NO SISTEMA
document.getElementById("login-form").addEventListener("submit", function(e) {
    e.preventDefault(); // Impede o envio padrão do formulário e manter a página atual

    const email = document.getElementById("email-input").value; // Pega o valor do campo de email
    const password = document.getElementById("password-input").value; // Pega o valor do campo de senha
    const checkSession = document.getElementById("session-check").checked; // Pega o valor do campo de sessão

    const account = getAccount(email); // Obtém os dados da conta usando o email fornecido

    if(!account) {     // Verifica se a conta existe
        alert("Opss! Verifique o usuário ou a senha.");
        return;
    }

    if(account) {
        if(account.password !== password) { // Verifica se a senha está correta
            alert("Opss! Verifique o usuário ou a senha.");
            return;
        }

        saveSession(email, checkSession); // Salva a sessão do usuário

        window.location.href = "home.html"; // Redireciona para a página home.html
    }
});

//CRIAR CONTA
document.getElementById("create-form").addEventListener("submit", function(e) {
    e.preventDefault(); // Impede o envio padrão do formulário e manter a página atual
    
    const email = document.getElementById("email-create-input").value; // Pega o valor do campo de email
    const password = document.getElementById("password-create-input").value; // Pega o valor do campo de senha
    // Envia uma requisição POST para o servidor com os dados do formulário
    
    if(email.length < 5) { // Verifica se o email tem pelo menos 5 caracteres
        alert("Por favor, insira um email válido.");
        return;
    }

    if(password.length < 4) { // Verifica se a senha tem pelo menos 4 caracteres
        alert("A senha deve ter pelo menos 4 caracteres.");
        return;
    }

    saveAccount({     // Chama a função para salvar os dados da conta
        login: email,
        password: password,
        transactions: [] // Inicializa a lista de transações vazia
    });

    myModal.hide(); // Fecha o modal de registro

    alert("Conta criada com sucesso!");
});

function checkLogged() { // Função para verificar se o usuário está logado
    if(session) {
        sessionStorage.setItem("logged", session); // Salva a sessão no sessionStorage do navegador
        logged = session; // Atualiza a variável logged com o valor da sessão
    }

    if(logged) {
        saveSession(logged, session);

        window.location.href = "home.html"; // Redireciona para a página home.html
    }
}

function saveAccount(data) { // Função para salvar os dados da conta
    localStorage.setItem(data.login, JSON.stringify(data)); // Salva os dados no localStorage do navegador
}

function saveSession (data, saveSession) { // Função para salvar a sessão do usuário
    if(saveSession) {
        localStorage.setItem("session", data); // Salva a sessão no localStorage do navegador
        return;
    }

    sessionStorage.setItem("logged", data); // Salva a sessão no sessionStorage do navegador
}

function getAccount(key) { // Função para obter os dados da conta
    const account = localStorage.getItem(key); // Obtém os dados do localStorage

    if(account) {
        return JSON.parse(account) // Retorna os dados como um objeto JavaScript
    }
    return ""; // Retorna uma string vazia se a conta não existir
}
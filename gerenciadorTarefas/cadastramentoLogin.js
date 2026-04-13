const form = document.querySelector(".login-form");
const login = document.getElementById("login");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const resposta = document.getElementById("resposta");


form.addEventListener("submit", async(event) => {
    event.preventDefault();
    if (login.value && email.value && password.value && confirmPassword.value) {
        const formData = new FormData(form);
        const dados = {
            login: formData.get("login"),
            email: formData.get("email"),
            password: formData.get("password"),
            passwordConfirm: formData.get("confirmPassword")
        }
        console.log(dados);
        await fetch("http://localhost:3000/cadastro",  {
            method: "POST",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify(dados)
        })
        .then(res => res.json())
        .then(respostaback => {
            console.log(respostaback.mensagem);
            resposta.textContent = respostaback.mensagem;
        })
        
    }
});

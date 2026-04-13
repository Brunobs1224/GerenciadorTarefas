const form = document.querySelector(".login-form");

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    console.log(formData);

    const dados = {
        login: formData.get("login"),
        password: formData.get("password")
    };

    await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dados)
    });
});


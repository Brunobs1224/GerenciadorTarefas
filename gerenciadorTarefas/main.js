import renderizarLista from "./renderizar.js";
import mostrarcalendario from "./calendario.js";

const buttonadicionar = document.getElementById("buttonadicionar");
let input = document.getElementById("input");
const listahtml = document.getElementById("listahtml");

function carregarTarefas() {
    fetch("http://localhost:3000/tasks")
    .then(res => res.json())
    .then(lista => {
        renderizarLista(lista, listahtml);
        mostrarcalendario(lista);
    })
};

buttonadicionar.addEventListener("click", () => {
    let prioridade = document.querySelector(".prioridade input:checked");
    let data = document.getElementById("data").value;
    if ((prioridade) && (data)) {
        let valor = input.value;

        fetch("http://localhost:3000/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                texto: valor,
                prioridade: prioridade.value,
                data: data, 
                completa: false
            })
        })

        .then(res => res.json())
        .then(resposta => {
            carregarTarefas();
        })
}});


listahtml.addEventListener("click", (e)=>{
    const buttonfechar = e.target.closest(".lixeira");
    if (!buttonfechar) return;

    const div = e.target.closest(".lista");
    const id = div.dataset.index;

    fetch(`http://localhost:3000/tasks/${id}`, {
        method: "DELETE", 
    })

    .then(res => res.json())
    .then(lista => {
        carregarTarefas();
    })
});

carregarTarefas();
console.log("main funcionando");
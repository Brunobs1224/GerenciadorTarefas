import renderizarLista from "./renderizar.js";
import mostrarcalendario from "./calendario.js";

const buttonadicionar = document.getElementById("buttonadicionar");
let input = document.getElementById("input");
const listahtml = document.getElementById("listahtml");

function carregarTarefas() {
    fetch("http://localhost:3000/tarefas")
    .then(res => res.json())
    .then(lista => {
        renderizarLista(lista, listahtml);
        mostrarcalendario(lista);
    })
};

buttonadicionar.addEventListener("click", () => {
    let prioridade = document.querySelector(".prioridade input:checked");
    let data = document.getElementById("data");
    if ((prioridade) && (data.value)) {
        let valor = input.value;

        fetch("http://localhost:3000", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                texto: valor,
                prioridade: prioridade.value,
                prazo: data.value
            })
        })

        .then(res => res.json())
        .then(lista => {
            renderizarLista(lista, listahtml);
            mostrarcalendario(lista);
        })
}});


listahtml.addEventListener("click", (e)=>{
    const buttonfechar = e.target.closest(".lixeira");
    if (!buttonfechar) return;

    const div = e.target.closest(".lista");
    const index = div.dataset.index;

    fetch(`http://localhost:3000/${index}`, {
        method: "DELETE"
    })

    .then(res => res.json())
    .then(lista => {
        renderizarLista(lista, listahtml)
        mostrarcalendario(lista);
    })
});

carregarTarefas();
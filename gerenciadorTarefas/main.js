import renderizarLista from "./renderizar.js";
import mostrarcalendario from "./calendario.js";

const buttonadicionar = document.getElementById("buttonadicionar");
let input = document.getElementById("input");
const listahtml = document.getElementById("listahtml");
let lista = [];
let buttonTodas = document.getElementById("todas");
let buttonPendentes = document.getElementById("pendentes");


buttonadicionar.addEventListener("click", ()=> {
    let prioridade = document.querySelector(".prioridade input:checked");
    let data = document.getElementById("data");
    if ((prioridade) && (data.value)) {
        let valor = input.value;
        lista.push({texto: valor,
            prioridade: prioridade.value,
            prazo: data.value
    });
        renderizarLista(lista, listahtml);
}});


listahtml.addEventListener("click", (e)=>{
    const buttonfechar = e.target.closest(".lixeira");
    if (!buttonfechar) return;

    const div = e.target.closest(".lista");
    const index = div.dataset.index;

    lista.splice(index, 1);
    renderizarLista(lista, listahtml);

});


mostrarcalendario();


import renderizarLista from "./renderizar.js";

const buttonadicionar = document.getElementById("buttonadicionar");
let input = document.getElementById("input");
const listahtml = document.getElementById("listahtml");
let lista = [];
let buttonTodas = document.getElementById("todas");
let buttonPendentes = document.getElementById("pendentes");


buttonadicionar.addEventListener("click", ()=> {
    let prioridade = document.querySelector(".prioridade input:checked");

    if (prioridade) {
        let valor = input.value;
        lista.push({texto: valor,
            prioridade: prioridade.value
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
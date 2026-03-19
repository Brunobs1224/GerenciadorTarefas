export default function renderizarLista(lista, listahtml) {
    listahtml.innerHTML = "";
    for (let i=0; i < lista.length; i++) {
        const div = document.createElement("div");
        const input = document.createElement("input");
        input.type = "checkbox";
        const buttonfechar = document.createElement("button");
        buttonfechar.classList.add("lixeira");
        buttonfechar.dataset.index = i;
        const x = document.createElement("p");
        x.textContent = "fechar";
        x.classList.add("lixeira");
        buttonfechar.appendChild(x);
        const p = document.createElement("p");      
        p.textContent = lista[i].texto;
        div.appendChild(input);
        div.appendChild(p);
        div.appendChild(buttonfechar);
        div.classList.add("lista");
        div.classList.add(lista[i].prioridade);
        div.dataset.index = i;
        listahtml.appendChild(div);
    };
};

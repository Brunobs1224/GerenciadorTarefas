export default function renderizarLista(lista, listahtml) {
    listahtml.innerHTML = "";
    for (let i=0; i < lista.length; i++) {
        const div = document.createElement("div");
        div.classList.add("lista");
        div.classList.add(lista[i].prioridade);
        div.dataset.index = lista[i].id;

        const input = document.createElement("input");
        input.type = "checkbox";

        const buttonfechar = document.createElement("button");
        buttonfechar.classList.add("lixeira");
        buttonfechar.dataset.index = lista[i].id;

        const x = document.createElement("img");
        x.src = "/icons8-lixeira-48.png";

        const p = document.createElement("p");
        p.textContent = lista[i].texto;

        const espacodate = document.createElement("p");
        let date = new Date(lista[i].data);
        let dateFormatada = date.toLocaleDateString('pt-BR', {timeZone: 'UTC'});
        espacodate.textContent = dateFormatada;
        espacodate.classList.add("date");

        const buttonConcluir = document.createElement("button");
        buttonConcluir.textContent = "Concluir";
        buttonConcluir.classList.add("buttonConcluir");

        buttonfechar.appendChild(x);
        buttonfechar.classList.add(lista[i].prioridade);

        div.appendChild(input);
        div.appendChild(p);
        div.appendChild(espacodate);
        div.appendChild(buttonConcluir);
        div.appendChild(buttonfechar);

        listahtml.appendChild(div);

        input.addEventListener("change", function() {
            if(input.checked) {
                buttonConcluir.style.display = "flex";
            }
            else {
                buttonConcluir.style.display = "none";
            }
        });
    };
};

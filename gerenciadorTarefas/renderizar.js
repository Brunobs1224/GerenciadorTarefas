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

        const p = document.createElement("p");
        p.textContent = lista[i].texto;

        const espacodate = document.createElement("p");
        let date = new Date(lista[i].prazo);
        let dateFormatada = date.toLocaleDateString('pt-BR', {timeZone: 'UTC'});
        espacodate.textContent = dateFormatada;
        espacodate.classList.add("date");


        buttonfechar.appendChild(x);

        div.appendChild(input);
        div.appendChild(p);
        div.appendChild(espacodate);
        div.appendChild(buttonfechar);


        div.classList.add("lista");
        div.classList.add(lista[i].prioridade);
        div.dataset.index = i;

        listahtml.appendChild(div);
    };
};

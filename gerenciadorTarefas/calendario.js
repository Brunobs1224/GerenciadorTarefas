import "./gerenciador.css";
import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";

let calendarioInstancia = null;

export default function mostrarcalendario(lista) {
    const calendario = document.getElementById("calendario");
    if (!calendario) return;

    if (calendarioInstancia) {
    calendarioInstancia.destroy();
    }

    calendarioInstancia = new Calendar(calendario, {
        plugins: [dayGridPlugin], 
        events: lista.map(item => ({
            title: item.texto, 
            start: item.prazo,
            allDay: true,
            display: "background",
            backgroundColor:
                item.prioridade === "alto" ? "red":
                item.prioridade === "medio" ? "yellow":
                item.prioridade === "baixo" ? "green":
                "gray"
        })), 
        initialView: 'dayGridMonth'});
    calendarioInstancia.render();
}



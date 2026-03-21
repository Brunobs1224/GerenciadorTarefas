import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";

export default function mostrarcalendario() {
    const calendario = document.getElementById("calendario");
    const mostracalendario = new Calendar(calendario, {plugins: [dayGridPlugin], initialView: 'dayGridMonth'});
    mostracalendario.render();
}

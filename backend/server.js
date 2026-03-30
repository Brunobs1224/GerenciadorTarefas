import express from "express";

const app = express();
const PORT = 3000;

const lista = [];

app.listen(PORT);
let proximoID = 1;

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,DELETE,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
});

app.get("/", (req, res) => {
    res.send(lista);
    console.log("Servidor funcionando");
});

app.post("/", (req, res) => {
    const novaLista = {
        id: proximoID++,
        texto: req.body.texto,
        prioridade: req.body.prioridade,
        prazo: req.body.prazo
    };
    lista.push(novaLista);
    console.log(lista);
    res.json(lista);
});

app.get("/tarefas", (req, res) => {
    res.json(lista);
});

app.delete("/:index", (req, res) => {
    const index = Number(req.params.index);
    if (index >= 0 && index < lista.length) {
        lista.splice(index, 1);
    }
    res.json(lista);
});


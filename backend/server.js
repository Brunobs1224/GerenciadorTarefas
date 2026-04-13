import express from "express";
import { pool } from "./db.js";

const app = express();
const PORT = 3000;

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,DELETE,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
});

app.get("/tasks", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM tasks ORDER BY id ASC");
        res.json(result.rows);
    }   catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar tasks 1' });
  }
});

app.post("/tasks", async (req, res) => {
    try{
        const {texto, data, prioridade, completa} = req.body;                
        const result = await pool.query(
            "INSERT INTO tasks (texto, data, prioridade, completa) VALUES ($1, $2, $3, $4) RETURNING *",
            [texto, data, prioridade, completa]
            );
        res.status(201).json(result.rows[0]);
    }   catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar task" });
  }
});

app.delete(`/tasks/:id`, async (req, res) => {
    try {
        const id = req.params.id;
        const result = await pool.query(
            "DELETE FROM tasks WHERE id = $1 RETURNING *",
            [id]
        );
        res.json(result.rows);
    } catch (error) {
        console.error("Erro no cadastro:", error);
        res.status(500).json({erro: "Erro no servidor"});
    }
});

app.post("/login", async (req, res) => {
    try{
        const {login, password} = req.body;
        console.log(req.body);
        const result = await pool.query(
            "SELECT * FROM users WHERE login=$1", [login]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({ erro: "Login não existe" });
            }

             
        const usuario = result.rows[0];

        if (usuario.password !== password) {
            return res.status(401).json({erro: "Senha incorreta"})
            }  
            else { res.json({ mensagem: "Login realizado com sucesso" });
            }   
    } 
    catch (error) {
            res.status(500).json({erro: "Erro no servidor"});
    }
            
});

app.post("/cadastro", async(req, res) => {
    try{
        const login = req.body.login;
        const email = req.body.email;
        const password = req.body.password;
        const passwordConfirm = req.body.passwordConfirm;

        if (password === passwordConfirm) {
            console.log(req.body);

            const result = await pool.query(
            "SELECT * FROM users WHERE login=$1", [login]);

            if (result.rows.length === 0) {
                await pool.query(
                    "INSERT INTO users (login, email, password) VALUES ($1, $2, $3) RETURNING *", [login, email, password]);
                return res.json({mensagem: "Cadastrado. Já pode usar sua conta!"});
            }
            else {
                console.log("Login já existe");
                return res.json({mensagem: "Conta não cadastrada, Login já existe"});
            }
        }
        else {
            res.json({mensagem: "Senhas não conferem, por favor tente outra vez"});
        }
    
    }
    catch (error) {
        console.error("Erro no cadastro:", error);
        res.status(500).json({erro: "Erro no servidor"});
    }
});

app.listen(PORT);

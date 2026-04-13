import pg from "pg";
const Pool = pg.Pool;

export const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'Garigue12@',
  database: 'tasks'
})

pool.connect()
  .then(() => console.log('Conectado ao PostgreSQL'))
  .catch(err => console.error('Erro na conexao', err))
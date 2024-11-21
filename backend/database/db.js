import sqlite3 from "sqlite3";
import crypto from "crypto";
import { resolve } from "path";

// Ativa o modo verbose do sqlite3
sqlite3.verbose();

// Conectar ao banco de dados
const db = new sqlite3.Database("./database/app.db", (err) => {
  if (err) {
    console.error("Erro ao abrir banco de dados:", err);
  } else {
    console.log("Banco de dados aberto com sucesso!");
  }
});

// Criar tabelas USERS e TOKENS
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS USERS (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL UNIQUE,
      username TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      user_level INTEGER DEFAULT 1
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS TOKENS (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      status TEXT CHECK(status IN ('active', 'blocked', 'expired', 'revoked', 'pending')) NOT NULL,
      token VARCHAR(32) NOT NULL UNIQUE,
      created_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(user_id) REFERENCES USERS(id)
    )
  `);

  console.log("Tabelas criadas com sucesso!");
});

// Registrar um novo usuário
const runQuery = async (query, params) => {
  return new Promise((resolve, reject) => {
    db.get(query, params, (err, row) => {
      // Use db.get para uma única linha
      if (err) {
        reject(err);
      } else {
        resolve(row); // Retorna a linha encontrada
      }
    });
  });
};

// Registrar um novo usuário
const registerUser = (email, password) => {
  const query = "INSERT INTO USERS (email, password) VALUES (?, ?)";
  db.run(query, [email, password], function (err) {
    if (err) {
      console.error("Erro ao registrar usuário:", err);
    } else {
      console.log("Usuário registrado com ID:", this.lastID);
    }
  });
};

// Verificar login
const loginUser = (email, password) => {
  const query = "SELECT * FROM USERS WHERE email = ? AND password = ?";
  db.get(query, [email, password], (err, user) => {
    if (err) {
      console.error("Erro ao verificar login:", err);
    } else if (user) {
      console.log("Login bem-sucedido para o usuário ID:", user.id);
      createToken(user.id);
    } else {
      console.log("Credenciais inválidas.");
    }
  });
};

// Criar um token para o usuário
const createToken = (userId) => {
  const token = crypto.randomBytes(16).toString("hex"); // Gera um token único
  const query = "INSERT INTO TOKENS (user_id, status, token) VALUES (?, ?, ?)";
  db.run(query, [userId, "active", token], function (err) {
    if (err) {
      console.error("Erro ao criar token:", err);
    } else {
      console.log("Token criado com sucesso:", token);
    }
  });
};

// Exemplo de uso
// registerUser('edias7942@gmail.com', '1234');
// loginUser("edias7942@gmail.com", "1234");

export default {
  db,
  runQuery,
};

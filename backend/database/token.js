import crypto from "crypto";
import db from "./db.js";

/**
 * Função para verificar informações de Token
 * @param {string} token Token de 32 caracteres hexadecimais ( 0-9 | a-f )
 * @returns {Promise<object>} object { id, user_id, status, token, created_time }
 */
const verifyToken = async (token) => {
  const token_query = "SELECT * FROM TOKENS WHERE token = ?";
  let token_response = await db.runQuery(token_query, [token]);

  if (!token_response) {
    token_response = { status: 404, response: "Token não encontrado" };
  }

  return token_response;
};

/**
 * Função para criar novo token
 * @param {number} userId
 * @returns {Promise<object>} success: { status: ( 200 | 500 ), response: {id, user_id, status, token, created_time, user_level}}
 */
const createToken = async (userId) => {
  const token = crypto.randomBytes(16).toString("hex"); // Gera um token único

  await db.runQuery(
    "INSERT INTO TOKENS (user_id, status, token) VALUES (?, ?, ?)",
    [userId, "active", token]
  );

  let token_response = await verifyToken(token);

  if (!token_response) {
    return { status: 500, response: "Erro durante a criação do Token." };
  }

  return { status: 200, response: token_response };
};

export default {
  verifyToken,
  createToken,
};

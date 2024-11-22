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
    token_response = { status: 401, response: "Token não encontrado" };
  }

  return token_response;
};

/**
 * Função para criar novo token
 * @param {number} userId ID do usuário para ser criado o Token
 * @returns {Promise<object>} object { status: ( 200 | 500 ), response: { id, user_id, status, token, created_time }
 */
const createToken = async (userId) => {
  const token = crypto.randomBytes(16).toString("hex"); // Gera um token único

  await db.runQuery(
    "INSERT INTO TOKENS (user_id, status, token) VALUES (?, ?, ?)",
    [userId, "active", token]
  );

  if (!token_response) {
    return { status: 500, response: "Erro durante a criação do Token." };
  }

  let token_response = await verifyToken(token);
  return { status: 200, response: token_response };
};

/**
 * Função para alterar status de um token
 * @param {string} token Token a ser modificado
 * @returns {Promise<object>} object { status: (200 | 404 | 500), response: string }
 */
const updateToken = async (token, newStatus) => {
  try {
    // Verifica se o token existe
    const tokenExists = await db.runQuery(
      "SELECT * FROM TOKENS WHERE token = ?",
      [token]
    );
    if (tokenExists.length === 0) {
      return { status: 404, response: "Token não encontrado." };
    }

    // Atualiza o status do token para o status passado como parâmetro
    await db.runQuery("UPDATE TOKENS SET status = ? WHERE token = ?", [
      newStatus,
      token,
    ]);

    return { status: 200, response: "Token alterado com sucesso." };
  } catch (error) {
    console.error("Erro ao alterar o token:", error);
    return {
      status: 500,
      response: "Erro durante a atualização do status do token.",
    };
  }
};

/**
 * Função para deletar um token
 * @param {string} token Token a ser deletado
 * @returns {Promise<object>} object { status: (200 | 404 | 500), response: string }
 */
const deleteToken = async (token) => {
  try {
    // Verifica se o token existe
    const tokenExists = await db.runQuery(
      "SELECT * FROM TOKENS WHERE token = ?",
      [token]
    );
    if (tokenExists.length === 0) {
      return { status: 404, response: "Token não encontrado." };
    }

    // Deleta o token
    await db.runQuery("DELETE FROM TOKENS WHERE token = ?", [token]);

    return { status: 200, response: "Token deletado com sucesso." };
  } catch (error) {
    console.error("Erro ao deletar o token:", error);
    return { status: 500, response: "Erro durante a exclusão do token." };
  }
};

export default {
  verifyToken,
  createToken,
  updateToken,
  deleteToken,
};

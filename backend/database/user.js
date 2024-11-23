import db from "./db.js";

/**
 * Função para verificar informações de Token
 * @param {string} email Email do Usuário
 * @returns {Promise<object>} {
    response: {
    id: 1,
    email: 'example@gmail.com',
    username: 'example234',
    password: '1234',
    user_level: 1
   },
   status: 200
}
 */
const verifyUser = async (email, password) => {
  const user_query = "SELECT * FROM USERS WHERE email = ?";
  let user_response = await db.runQuery(user_query, [email]);

  if (!user_response) {
    return { status: 404, response: "Usuário não encontrado" };
  }

  if (password !== user_response.password) {
    return { status: 401, response: "Senha Inválida" };
  }

  return { response: user_response, status: 200 };
};

export default {
  verifyUser,
};

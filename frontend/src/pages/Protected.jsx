import { useEffect, useState } from "react";
import axios from "axios";

const verifyToken = async (setIsValidUser) => {
  try {
    const userToken = localStorage.getItem("user_token");
    if (!userToken) {
      setIsValidUser(false);
      return;
    }

    const response = await axios.post(
      "http://localhost:3001/verifyToken",
      {},
      { headers: { user_token: userToken } }
    );

    console.log(response);

    // Verifica a resposta
    if (response.data.status === "active") {
      setIsValidUser(true);
    } else {
      setIsValidUser(false);
    }
  } catch (error) {
    console.error("Erro ao verificar o token:", error);
    setIsValidUser(false);
  }
};

function Protected() {
  const [isValidUser, setIsValidUser] = useState(null); // null para indicar carregamento
  const [isUserChecked, setIsUserChecked] = useState(false);

  useEffect(() => {
    if (!isUserChecked) {
      verifyToken(setIsValidUser);
    }

    setIsUserChecked(true);
  }, []);

  if (isValidUser === null) {
    return <div>Carregando...</div>; // Tela de carregamento
  }

  if (isValidUser === false) {
    // window.location.href = "/login"; // Redireciona para a página de login
    return <div>Não autorizado</div>;
  }

  return <div>Você está em uma área privada</div>;
}

export default Protected;

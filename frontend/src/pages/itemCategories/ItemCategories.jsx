import { useEffect, useState } from "react";
import config from "./../../config/config.js";
import axios from "axios";

const verifyToken = async (setIsValidUser) => {
    try {
        const authorization = localStorage.getItem("authorization");
        if (!authorization) {
            setIsValidUser(false);
            return;
        }

        const response = await axios.post(
            `${config.backendUrl}/verifyToken`,
            {},
            { headers: { authorization: authorization } }
        );

        // Verifica a resposta
        console.log(response);
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

function ItemCategories() {
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
        window.location.href = "/login"; // Redireciona para a página de login
    }

    if (isValidUser) {
        return (
            <div>
                <h1>Categorias</h1>
                <p>
                    <a href="/categories/roteadores">Roteadores</a>
                </p>
                <p>
                    <a href="/categories/suporte">Suporte</a>
                </p>
            </div>
        );
    }
}

export default ItemCategories;

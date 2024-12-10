import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

const PrivateRoute = async ({ children }) => {
    const verifyToken = async (setIsValidUser) => {
        try {
            const authorization = localStorage.getItem("authorization");
            if (!authorization) {
                setIsValidUser(false);
                return;
            }

            const response = await axios.post(
                "http://localhost:3001/verifyToken",
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
        return <Navigate to="/login" />;
    }

    if (isValidUser) {
        return children;
    }
};

export default PrivateRoute;

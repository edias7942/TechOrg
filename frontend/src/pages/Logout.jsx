import { useState } from "react";

function Logout({ teste }) {
    localStorage.clear();
    return (window.location.href = "/login"); // Redireciona para a página de login
}

export default Logout;

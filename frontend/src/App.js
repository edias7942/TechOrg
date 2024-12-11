import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Importação das páginas
import Home from "./pages/Home";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import TestePrivate from "./pages/itemCategories/TestePrivate";
import ItemCategories from "./pages/itemCategories/ItemCategories";

function App() {
    return (
        <Router>
            <Routes>
                {/* Rotas e componentes correspondentes */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/item_categories" element={<ItemCategories />} />
                {/* Rota para páginas não encontradas */}
                <Route path="/logout" element={<Logout />} />
                <Route path="/teste" element={<TestePrivate />} />
            </Routes>
        </Router>
    );
}

export default App;

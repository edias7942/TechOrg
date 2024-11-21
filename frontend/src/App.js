import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Importação das páginas
import Home from "./pages/Home";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Protected from "./pages/Protected";

function App() {
  return (
    <Router>
      <Routes>
        {/* Rotas e componentes correspondentes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/protected" element={<Protected />} />
        {/* Rota para páginas não encontradas */}
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Router>
  );
}

export default App;

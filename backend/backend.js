import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import db from "./database/db.js";
import token from "./database/token.js";
import cors from "cors";
import user from "./database/user.js";

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Função que realiza uma verificação no authToken do usuário.
app.post("/verifyToken", async (req, res) => {
    const { authorization } = req.headers;
    let token_verification = await token.verify(authorization);
    console.log(token_verification);
    res.status(200).json(token_verification);
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    let user_verification = await user.verify(email, password);

    if (user_verification.status === 200) {
        let create_token = await token.add(user_verification.response.id);

        if (create_token.status === 200) {
            const json_response = {
                message: "Login successful",
                token: create_token.response,
            };

            res.status(200).json(json_response);
        } else {
            res.status(500).json({
                message: "Erro ao gerar o token, tente novamente.",
            });
        }
    } else {
        res.status(user_verification.status).json(user_verification.response);
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

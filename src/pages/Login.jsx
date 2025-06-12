import React, { useState } from "react";
import axios from "axios";
import { useUser } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "../components/HeaderComponents/ThemeToggle";
import Logo from "../assets/Logo.png";

function Login({ theme, setTheme }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useUser();
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Preencha todos os campos.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/auth/login", {
        email: email,
        password: password,
      });

      if (response.data && response.data.token && response.data.id) {
        const { token, id, namecompany, email, cnpj, is_blocked } =
          response.data;
        login({ id, namecompany, email, cnpj, is_blocked }, token);
        navigate("/management");
      } else {
        setError("Dados inválidos recebidos da API.");
      }
    } catch (err) {
      console.error(err);
      setError("Usuário ou senha inválidos.");
    }
  };

  const containerTheme =
    theme === "dark" ? "bg-gray-900 text-gray-500" : "bg-white text-gray-900";
  const cardTheme =
    theme === "dark"
      ? "bg-gray-900 text-gray-300 border-gray-700"
      : "bg-gray-100 text-gray-900 border-gray-600";

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 ${containerTheme} transition-colors duration-300`}
    >
      <div
        className={`w-full max-w-md p-4 rounded-2xl shadow-xl border ${cardTheme}`}
      >
        <div className="flex justify-end items-center">
          <ThemeToggle theme={theme} setTheme={setTheme} />
        </div>
        <div className="flex justify-center items-center">
          <img src={Logo} className="w-48 h-48" />
        </div>
        <p className="mb-4 text-center text-sm text-gray-500 dark:text-gray-500 mt-2">
          Acesse sua conta e transforme seu PDV.
        </p>

        {error && (
          <div className="bg-red-100 text-red-700 px-3 py-2 rounded mb-4 text-sm text-center">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seuemail@exemplo.com"
            className="w-full px-3 py-2 border rounded-lg text-sm outline-none dark:bg-gray-500 dark:border-gray-600"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Senha</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full px-3 py-2 border rounded-lg text-sm outline-none dark:bg-gray-500 dark:border-gray-600"
          />
        </div>

        <button
          onClick={handleLogin}
          className="w-full bg-orange-500/90 hover:bg-orange-600/80 text-white font-semibold cursor-pointer py-2 px-4 rounded-lg transition-colors"
        >
          Entrar
        </button>

        <p className="mt-5 text-xs text-center text-gray-500 dark:text-gray-500">
          Precisa de ajuda? Fale com nossos consultores.
        </p>
      </div>
    </div>
  );
}

export default Login;

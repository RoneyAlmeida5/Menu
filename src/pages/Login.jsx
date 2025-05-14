import React, { useState } from "react";
import axios from "axios";
import { useUser } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

function Login() {
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

  return (
    <div className="flex items-center justify-center relative py-30 sm:max-w-xs sm:mx-auto">
      <div className="flex items-center justify-center min-h-96 px-8 py-6 mt-4 text-left bg-white dark:bg-gray-800 rounded-xl shadow-lg">
        <div className="flex flex-col justify-center items-center h-full select-none">
          <div className="flex flex-col items-center justify-center gap-2 mb-8">
            <p className="m-0 text-[16px] font-semibold dark:text-white">
              DelishUp
            </p>
            <span className="m-0 text-xs max-w-[90%] text-center text-[#8B8E98]">
              Entre na sua conta e descubra uma nova experiência com o nosso
              sistema de PDV!
            </span>
          </div>

          {error && (
            <div className="text-red-500 text-xs mb-3 text-center">{error}</div>
          )}

          <div className="w-full flex flex-col gap-2">
            <label className="font-semibold text-xs text-gray-400">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="border rounded-lg px-3 py-2 mb-5 text-sm w-full outline-none dark:border-gray-500 dark:bg-gray-900"
            />
          </div>

          <div className="w-full flex flex-col gap-2">
            <label className="font-semibold text-xs text-gray-400">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="border rounded-lg px-3 py-2 mb-5 text-sm w-full outline-none dark:border-gray-500 dark:bg-gray-900"
            />
          </div>

          <div>
            <button
              onClick={handleLogin}
              className="py-1 px-8 bg-blue-500 hover:bg-blue-800 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg cursor-pointer select-none"
            >
              Login
            </button>
          </div>
          <span className="mt-5 text-xs max-w-[90%] text-center text-[#8B8E98]">
            Converse com nossos consultores! Eles vão te ajudar a encontrar o
            plano perfeito para você.
          </span>
        </div>
      </div>
    </div>
  );
}

export default Login;

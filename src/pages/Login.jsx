import React, { useState } from "react";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!username || !password) {
      setError("Preencha todos os campos.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/auth/login", {
        email: username,
        password: password,
      });

      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      window.location.href = "/management";
    } catch (err) {
      setError("Usuário ou senha inválidos.");
    }
  };

  return (
    <div className="relative py-3 sm:max-w-xs sm:mx-auto">
      <div className="min-h-96 px-8 py-6 mt-4 text-left bg-white dark:bg-gray-900 rounded-xl shadow-lg">
        <div className="flex flex-col justify-center items-center h-full select-none">
          <div className="flex flex-col items-center justify-center gap-2 mb-8">
            <div className="w-8 h-8 bg-gray-700" />
            <p className="m-0 text-[16px] font-semibold dark:text-white">
              Login to your Account
            </p>
            <span className="m-0 text-xs max-w-[90%] text-center text-[#8B8E98]">
              Get started with our app, just start section and enjoy experience.
            </span>
          </div>

          {error && (
            <div className="text-red-500 text-xs mb-3 text-center">{error}</div>
          )}

          <div className="w-full flex flex-col gap-2">
            <label className="font-semibold text-xs text-gray-400">
              Username
            </label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
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
        </div>
      </div>
    </div>
  );
}

export default Login;

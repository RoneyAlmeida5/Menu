import React, { useEffect, useState } from "react";

function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark";
  });

  useEffect(() => {
    const root = window.document.documentElement;

    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <label className="inline-flex items-center relative cursor-pointer">
      <input
        type="checkbox"
        checked={darkMode}
        onChange={() => setDarkMode(!darkMode)}
        className="peer hidden"
      />
      <div className="relative flex w-18 h-9 rounded-full bg-gradient-to-r from-gray-300 to-gray-600 peer-checked:from-yellow-200 peer-checked:to-zinc-500 transition-colors duration-500">
        <div
          className={`
            absolute top-1 left-1 h-7 w-7 bg-gray-200 rounded-full shadow-md 
            flex items-center justify-center text-lg transform transition-transform duration-300 ease-in-out
            ${darkMode ? "translate-x-[40px]" : "translate-x-0"}
          `}
        >
          {darkMode ? "🌙" : "🌤️"}
        </div>
      </div>
    </label>
  );
}

export default ThemeToggle;

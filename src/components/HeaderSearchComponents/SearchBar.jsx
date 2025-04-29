import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";

const SearchBar = ({ onSearch, theme }) => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event) => {
    const term = event.target.value;
    setInputValue(term);
    onSearch(term);
  };

  const inputClass =
    theme === "dark"
      ? "w-80 pl-10 p-2 rounded-xl bg-gray-800 text-white placeholder-gray-400 border-none"
      : "w-80 pl-10 p-2 rounded-xl bg-white text-black placeholder-gray-500 border border-gray-300";

  const iconClass = theme === "dark" ? "text-gray-400" : "text-gray-600";

  return (
    <div className="relative">
      <span
        className={`absolute inset-y-0 left-3 flex items-center ${iconClass}`}
      >
        <FiSearch />
      </span>
      <input
        className={inputClass}
        placeholder="Pesquise seu produto"
        type="text"
        value={inputValue}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchBar;

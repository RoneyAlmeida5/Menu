import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";

const SearchBar = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event) => {
    const term = event.target.value;
    setInputValue(term);
    onSearch(term);
  };

  return (
    <div className="relative">
      <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
        <FiSearch />
      </span>
      <input
        className="w-80 pl-10 p-2 rounded-xl bg-gray-800 text-white placeholder-gray-400"
        placeholder="Pesquise seu produto"
        type="text"
        value={inputValue}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchBar;

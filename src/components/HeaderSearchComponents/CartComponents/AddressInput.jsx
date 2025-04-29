import React, { useState, useEffect } from "react";

const AddressInput = ({ onSelect, theme }) => {
  const [inputValue, setInputValue] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [complement, setComplement] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (inputValue.length < 3) {
        setSuggestions([]);
        return;
      }

      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            inputValue
          )}&addressdetails=1&limit=5`
        );
        const data = await res.json();
        setSuggestions(data);
      } catch (error) {
        console.error("Erro ao buscar endereço:", error);
      }
    };

    const delay = setTimeout(() => {
      fetchSuggestions();
    }, 400);

    return () => clearTimeout(delay);
  }, [inputValue]);

  const formatAddress = (place) => {
    const addr = place.address;
    const rua =
      addr.road || addr.pedestrian || addr.cycleway || addr.footway || "";
    const bairro = addr.suburb || addr.neighbourhood || addr.village || "";
    const cidade =
      addr.city ||
      addr.town ||
      addr.municipality ||
      addr.state_district ||
      addr.state ||
      "";

    return [rua, bairro, cidade].filter(Boolean).join(", ");
  };

  const handleSelect = (place) => {
    const formatted = formatAddress(place);
    setInputValue(formatted);
    setSuggestions([]);
    setHouseNumber("");
    setComplement("");
    onSelect({ ...place, formatted });
  };

  useEffect(() => {
    if (inputValue) {
      onSelect({
        address: inputValue,
        houseNumber,
        complement,
        fullAddress: `${inputValue}${houseNumber ? `, ${houseNumber}` : ""}${
          complement ? `, ${complement}` : ""
        }`,
      });
    }
  }, [houseNumber, complement]);

  const borderClass = theme === "dark" ? "border-gray-600" : "border-gray-300";
  const bgClass =
    theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black";

  return (
    <div className="relative flex flex-col mt-2 mb-4 space-y-3">
      <label
        htmlFor="address-input"
        className={`text-sm font-medium ${
          theme === "dark" ? "text-gray-300" : "text-gray-700"
        }`}
      >
        Endereço de Entrega
      </label>

      <input
        id="address-input"
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 150)}
        placeholder="Digite seu endereço..."
        className={`w-full px-4 py-2 rounded-md border outline-none focus:ring-2 focus:ring-gray-600 ${borderClass} ${bgClass}`}
      />

      {isFocused && suggestions.length > 0 && (
        <ul
          className={`absolute top-full mt-1 w-full rounded-md shadow-lg z-10 max-h-60 overflow-auto ${bgClass} border ${borderClass}`}
        >
          {suggestions.map((place, idx) => {
            const formatted = formatAddress(place);
            return (
              <li
                key={idx}
                onClick={() => handleSelect(place)}
                className="cursor-pointer px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              >
                {formatted}
              </li>
            );
          })}
        </ul>
      )}
      <input
        type="text"
        value={houseNumber}
        onChange={(e) => setHouseNumber(e.target.value)}
        placeholder="Número"
        className={`w-full px-4 py-2 rounded-md border outline-none ${borderClass} ${bgClass}`}
      />
      <input
        type="text"
        value={complement}
        onChange={(e) => setComplement(e.target.value)}
        placeholder="Complemento (opcional)"
        className={`w-full px-4 py-2 rounded-md border outline-none ${borderClass} ${bgClass}`}
      />
    </div>
  );
};

export default AddressInput;

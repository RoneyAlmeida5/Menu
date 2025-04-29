import React from "react";

const PaymentMethodSelector = ({ selectedValue, onChange, theme }) => {
  const bgColor = theme === "dark" ? "bg-gray-900" : "bg-gray-300";
  const textColor = theme === "dark" ? "text-gray-300" : "text-gray-700";
  const activeBgColor = theme === "dark" ? "bg-gray-700" : "bg-white";
  const activeTextColor = theme === "dark" ? "text-white" : "text-gray-900";

  const options = ["Cartão", "Pix", "Dinheiro"];

  return (
    <div
      className={`w-full flex flex-wrap rounded-md shadow-sm p-1 text-sm ${bgColor}`}
    >
      {options.map((option) => (
        <label key={option} className="radio flex-1 text-center">
          <input
            type="radio"
            name="paymentMethod"
            value={option}
            checked={selectedValue === option}
            onChange={onChange}
            className="hidden"
          />
          <span
            className={`name flex cursor-pointer items-center justify-center rounded-md border-none py-2 transition-all duration-150 ease-in-out ${textColor} ${
              selectedValue === option
                ? `${activeBgColor} font-semibold ${activeTextColor}`
                : ""
            }`}
          >
            {option}
          </span>
        </label>
      ))}
    </div>
  );
};

export default PaymentMethodSelector;
